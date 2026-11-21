import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const COLOR_PRESETS = [
  { label: 'Ashirwad Blue', value: '#2456D3' },
  { label: 'Classic Dark', value: '#0F172A' },
  { label: 'Deep Navy', value: '#1E3A8A' }
];

const LOGO_PATH = '/images/brand/logo-icon-512.png';

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function fetchAsDataUrl(src) {
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function QrCard({
  title,
  subtitle,
  url,
  filenameBase,
  qrColor,
  includeLogo,
  logoDataUrl,
  showCaption,
  defaultCaption
}) {
  const [caption, setCaption] = useState(defaultCaption);
  const [pngUrl, setPngUrl] = useState('');
  const [svgMarkup, setSvgMarkup] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!url) {
      setPngUrl('');
      setSvgMarkup('');
      return;
    }

    const activeCaption = showCaption ? caption.trim() : '';

    const generate = async () => {
      try {
        const size = 1024;
        const captionHeight = activeCaption ? 104 : 0;

        // 1. Generate PNG on canvas
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: size,
          margin: 2,
          color: { dark: qrColor, light: '#FFFFFF' },
          errorCorrectionLevel: 'H'
        });

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size + captionHeight;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const qrImg = await loadImage(qrDataUrl);
        ctx.drawImage(qrImg, 0, 0, size, size);

        if (includeLogo && logoDataUrl) {
          try {
            const logoImg = await loadImage(logoDataUrl);
            const boxSize = Math.round(size * 0.21);
            const boxX = Math.round((size - boxSize) / 2);
            const boxY = Math.round((size - boxSize) / 2);
            const pad = Math.round(boxSize * 0.14);

            ctx.fillStyle = '#FFFFFF';
            drawRoundedRect(ctx, boxX, boxY, boxSize, boxSize, Math.round(boxSize * 0.18));
            ctx.fill();

            ctx.strokeStyle = '#E2E8F0';
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.drawImage(
              logoImg,
              boxX + pad,
              boxY + pad,
              boxSize - pad * 2,
              boxSize - pad * 2
            );
          } catch {
            // Skip logo overlay if image fails to load
          }
        }

        if (activeCaption) {
          ctx.fillStyle = qrColor;
          ctx.font = '700 42px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(activeCaption, size / 2, size + captionHeight / 2 - 8);
        }

        const finalPng = canvas.toDataURL('image/png');

        // 2. Generate SVG
        let svg = await QRCode.toString(url, {
          type: 'svg',
          margin: 2,
          color: { dark: qrColor, light: '#FFFFFF' },
          errorCorrectionLevel: 'H'
        });

        const viewBoxMatch = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
        const vbSize = viewBoxMatch ? parseInt(viewBoxMatch[1], 10) : 45;
        const svgCaptionUnits = activeCaption ? Math.round(vbSize * 0.12) : 0;

        if (svgCaptionUnits > 0) {
          svg = svg.replace(
            /viewBox="0 0 \d+ \d+"/,
            `viewBox="0 0 ${vbSize} ${vbSize + svgCaptionUnits}"`
          );
          svg = svg.replace(
            /<path fill="#ffffff" d="M0 0h\d+v\d+H0z"\/>/i,
            `<rect width="${vbSize}" height="${vbSize + svgCaptionUnits}" fill="#ffffff"/>`
          );
        }

        const overlays = [];
        if (includeLogo && logoDataUrl) {
          const box = +(vbSize * 0.21).toFixed(2);
          const pos = +((vbSize - box) / 2).toFixed(2);
          const pad = +(box * 0.14).toFixed(2);
          const inner = +(box - pad * 2).toFixed(2);
          const rx = +(box * 0.18).toFixed(2);
          overlays.push(
            `<rect x="${pos}" y="${pos}" width="${box}" height="${box}" rx="${rx}" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="0.25"/>`,
            `<image href="${logoDataUrl}" x="${(pos + pad).toFixed(2)}" y="${(pos + pad).toFixed(2)}" width="${inner}" height="${inner}" preserveAspectRatio="xMidYMid meet"/>`
          );
        }

        if (activeCaption) {
          const fontSize = +(vbSize * 0.044).toFixed(2);
          const textY = +(vbSize + svgCaptionUnits * 0.45).toFixed(2);
          overlays.push(
            `<text x="${(vbSize / 2).toFixed(2)}" y="${textY}" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="${fontSize}" fill="${qrColor}">${escapeXml(activeCaption)}</text>`
          );
        }

        if (overlays.length > 0) {
          svg = svg.replace('</svg>', `${overlays.join('')}</svg>`);
        }

        if (!cancelled) {
          setPngUrl(finalPng);
          setSvgMarkup(svg);
        }
      } catch (err) {
        console.error('QR generation failed:', err);
      }
    };

    generate();
    return () => {
      cancelled = true;
    };
  }, [url, qrColor, includeLogo, logoDataUrl, showCaption, caption]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback ignored
    }
  };

  const handleDownloadPng = () => {
    if (!pngUrl) return;
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `${filenameBase}.png`;
    link.click();
  };

  const handleDownloadSvg = () => {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${filenameBase}.svg`;
    link.click();
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: 1.45 }}>
          {subtitle}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '18px',
          minHeight: '230px'
        }}
      >
        {pngUrl ? (
          <img
            src={pngUrl}
            alt={`${title} QR Code`}
            style={{ width: '200px', height: 'auto', display: 'block', borderRadius: '6px', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)' }}
          />
        ) : (
          <span style={{ fontSize: '13px', color: '#94A3B8' }}>Enter a valid URL</span>
        )}
      </div>

      {showCaption && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11.5px', fontWeight: '600', color: '#475569' }}>
            Print Caption
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter label under QR code"
            style={{
              width: '100%',
              padding: '7px 10px',
              borderRadius: '7px',
              border: '1px solid #CBD5E1',
              fontSize: '12.5px',
              color: '#0F172A',
              outline: 'none'
            }}
          />
        </div>
      )}

      <div
        style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '8px 10px',
          fontSize: '12px',
          color: '#334155',
          wordBreak: 'break-all',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
        }}
      >
        {url}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={!pngUrl}
          style={{
            flex: '1 1 110px',
            padding: '9px 12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2456D3',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: '600',
            cursor: pngUrl ? 'pointer' : 'not-allowed'
          }}
        >
          Download PNG
        </button>
        <button
          type="button"
          onClick={handleDownloadSvg}
          disabled={!svgMarkup}
          style={{
            flex: '1 1 110px',
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            fontSize: '13px',
            fontWeight: '600',
            cursor: svgMarkup ? 'pointer' : 'not-allowed'
          }}
        >
          Download SVG
        </button>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#475569',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#475569',
            fontSize: '13px',
            fontWeight: '500',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          Open ↗
        </a>
      </div>
    </div>
  );
}

export default function QrCodesManager() {
  const defaultOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ashirwadplastics.com';
  const [baseUrl, setBaseUrl] = useState(defaultOrigin);
  const [customUrl, setCustomUrl] = useState('');
  const [qrColor, setQrColor] = useState('#2456D3');
  const [includeLogo, setIncludeLogo] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [logoDataUrl, setLogoDataUrl] = useState('');

  useEffect(() => {
    fetchAsDataUrl(LOGO_PATH)
      .then(setLogoDataUrl)
      .catch(() => setLogoDataUrl(''));
  }, []);

  const normalizedBase = baseUrl.trim().replace(/\/+$/, '');
  const brochureUrl = normalizedBase ? `${normalizedBase}/docs/AP-Brochure.pdf` : '';
  const queryUrl = normalizedBase ? `${normalizedBase}/query` : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: '700', color: '#0F172A' }}>
              QR Code Generator &amp; Branding
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
              Generates high-resolution PNG (1024px) &amp; print-ready SVG QR codes with Ashirwad Plastics branding.
            </p>
          </div>
          {baseUrl !== defaultOrigin && (
            <button
              type="button"
              onClick={() => setBaseUrl(defaultOrigin)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Reset to Current Origin
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 280px', maxWidth: '440px' }}>
            <label htmlFor="qr-base-url" style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>
              Website Base URL
            </label>
            <input
              id="qr-base-url"
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://your-domain.com"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13.5px',
                color: '#0F172A',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>
              Brand Color
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setQrColor(preset.value)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '7px',
                    border: qrColor.toLowerCase() === preset.value.toLowerCase() ? `2px solid ${preset.value}` : '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: preset.value }} />
                  {preset.label}
                </button>
              ))}
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                title="Custom QR color"
                style={{ width: '34px', height: '32px', padding: '2px', borderRadius: '6px', border: '1px solid #CBD5E1', cursor: 'pointer', backgroundColor: '#FFFFFF' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', paddingTop: '4px' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500', color: '#1E293B', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={includeLogo}
              onChange={(e) => setIncludeLogo(e.target.checked)}
              style={{ width: '15px', height: '15px', accentColor: '#2456D3', cursor: 'pointer' }}
            />
            Include Ashirwad Logo in Center
          </label>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500', color: '#1E293B', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showCaption}
              onChange={(e) => setShowCaption(e.target.checked)}
              style={{ width: '15px', height: '15px', accentColor: '#2456D3', cursor: 'pointer' }}
            />
            Include Print Caption Below QR
          </label>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '18px'
        }}
      >
        <QrCard
          title="1. Company Brochure PDF"
          subtitle="Scans directly to your AP-Brochure.pdf document."
          url={brochureUrl}
          filenameBase="ashirwad-brochure-qr"
          qrColor={qrColor}
          includeLogo={includeLogo}
          logoDataUrl={logoDataUrl}
          showCaption={showCaption}
          defaultCaption="Scan for Brochure"
        />

        <QrCard
          title="2. Submit a Query Page"
          subtitle="Opens the mobile-friendly Name, Email & Query form. Responses appear in Submissions → General Queries."
          url={queryUrl}
          filenameBase="ashirwad-query-qr"
          qrColor={qrColor}
          includeLogo={includeLogo}
          logoDataUrl={logoDataUrl}
          showCaption={showCaption}
          defaultCaption="Scan to Submit a Query"
        />
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
            Custom Link QR Code (Optional)
          </h3>
          <p style={{ margin: 0, fontSize: '12.5px', color: '#64748B' }}>
            Need a branded QR code for a specific product page or campaign? Paste any URL below.
          </p>
        </div>
        <input
          type="url"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="https://your-domain.com/products/ophthalmic"
          style={{
            width: '100%',
            maxWidth: '520px',
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            fontSize: '13.5px',
            color: '#0F172A',
            outline: 'none'
          }}
        />
        {customUrl.trim() && (
          <div style={{ maxWidth: '380px' }}>
            <QrCard
              title="Custom QR Code"
              subtitle="Generated from the custom URL above."
              url={customUrl.trim()}
              filenameBase="ashirwad-custom-qr"
              qrColor={qrColor}
              includeLogo={includeLogo}
              logoDataUrl={logoDataUrl}
              showCaption={showCaption}
              defaultCaption="Ashirwad Plastics"
            />
          </div>
        )}
      </div>
    </div>
  );
}
