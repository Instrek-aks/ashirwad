// Frontend Blog Service with Hybrid Backend API & LocalStorage Persistence

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl || !envUrl.trim()) return 'http://localhost:5000/api/v1';
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api/v1') ? clean : `${clean}/api/v1`;
};

const API_BASE_URL = getApiBaseUrl();
const STORAGE_KEY = 'ashirwad_blogs_store_v7';

export const SEED_BLOGS = [
  {
    id: 'b-ophthalmic',
    _id: 'b-ophthalmic',
    title: 'Advancing Ophthalmic & Nasal Delivery: Precision Cleanroom Molding in Healthcare',
    slug: 'advancing-ophthalmic-nasal-delivery-precision-cleanroom-molding',
    excerpt: 'How Class 10,000 cleanroom automation, micrometric drop-volume engineering, and strict bioburden controls are redefining safety benchmarks in sterile liquid pharmaceutical dispensing.',
    category: 'Pharmaceutical Packaging',
    coverImage: '/blog-stethoscope.webp',
    readTime: '6 min read',
    author: {
      name: 'Ashirwad Plastics Editorial Team',
      role: 'Packaging & R&D Specialist',
      avatar: '/logo-icon-192.png'
    },
    tags: ['Ophthalmic', 'Cleanroom', 'Precision Molding', 'Drug Delivery', 'Healthcare'],
    isPublished: true,
    featured: true,
    publishedAt: '2026-01-20T09:00:00.000Z',
    views: 0,
    contentHtml: `
      <p>In modern ophthalmic and nasal therapeutics, patient outcomes depend directly on container closure integrity and volumetric dispensing precision. Ashirwad Plastics operates certified Class 10,000 and Class 100,000 cleanrooms in Solan, Himachal Pradesh, combining robotic injection blow molding (IBM) with optical machine vision to eliminate particulate contamination and maintain tolerances down to ±0.02 mm.</p>

      <p>Every batch of three-piece dropper assemblies—comprising LDPE bottles, controlled-orifice plugs, and tamper-evident caps—undergoes automated leak integrity testing, torque retention verification, and gamma-irradiation compatibility audits.</p>

      <h2>Micrometric Drop Volume Consistency and Patient Safety</h2>
      <p>Ocular surface tissues absorb medication within a strictly limited liquid capacity (typically 25–35 µL). Overdosing causes excessive systemic absorption through the nasolacrimal duct, while underdosing compromises therapeutic efficacy. Our precision-engineered nozzle geometry produces predictable, uniform drop weights across diverse liquid viscosities.</p>

      <div class="blog-full-image">
        <img src="/blog-stethoscope.webp" alt="Cleanroom pharmaceutical delivery testing" />
      </div>

      <p>By conducting continuous flow-rate rheology assessments and finite-element fluid analysis during tool design, we guarantee zero spattering and instantaneous droplet release upon 15°–45° bottle inversion angles.</p>

      <h2>Cleanroom Environmental Controls & Bioburden Mitigation</h2>
      <p>Maintaining sterile compliance requires comprehensive bioburden controls at every transformation stage. High-efficiency particulate air (HEPA) filtration units continuously refresh positive-pressure cleanroom air at 35 air changes per hour.</p>

      <p>Virgin medical polymers (USP Class VI compliant LDPE and HDPE) are pneumatically transferred via closed vacuum conduits directly to heating barrels, preventing atmospheric moisture and electrostatic dust accumulation.</p>

      <h2>Future Developments in Preservative-Free Multi-Dose Pumps</h2>
      <p>As the pharmaceutical landscape pivots toward preservative-free formulations to mitigate corneal toxicity, Ashirwad Plastics is currently standardizing next-generation mechanical one-way check valves and silicone-free spring mechanisms that prevent back-suction and bacterial migration into the reservoir.</p>

      <div class="blog-two-images">
        <img src="/Product_Images/32.png" alt="Ophthalmic Dropper Packaging" />
        <img src="/Product_Images/34.png" alt="Cleanroom Packaging Systems" />
      </div>
    `
  },
  {
    id: 'b-sustainable',
    _id: 'b-sustainable',
    title: 'The Future of Sustainable Polymers: Mono-Material Barrier Systems in Pharma',
    slug: 'future-of-sustainable-polymers-mono-material-barrier-systems',
    excerpt: 'Overcoming recycling roadblocks with next-generation high-density polyethylene (HDPE) formulations that guarantee moisture barrier integrity while achieving 100% circularity.',
    category: 'Sustainability & R&D',
    coverImage: '/blog-card-1.webp',
    readTime: '5 min read',
    author: {
      name: 'Ashirwad Plastics Editorial Team',
      role: 'ESG & Polymer Research Division',
      avatar: '/logo-icon-192.png'
    },
    tags: ['Sustainability', 'Mono-Material', 'HDPE', 'Circular Economy', 'Green Pharma'],
    isPublished: true,
    featured: false,
    publishedAt: '2026-01-18T10:00:00.000Z',
    views: 0,
    contentHtml: `
      <p>The pharmaceutical packaging sector has long grappled with an inherent conflict between barrier performance and recyclability. Traditional multi-layer blister laminates and co-extruded barrier bottles combine incompatible resins, rendering post-consumer mechanical recycling nearly impossible. Ashirwad Plastics is engineering mono-material HDPE and PP systems that bridge this gap.</p>

      <h2>Redefining Moisture Vapor Transmission Rates (MVTR)</h2>
      <p>For sensitive oral solid doses and effervescent formulations, moisture ingress degrades active pharmaceutical ingredients (APIs). Through advanced macromolecular alignment during extrusion blow molding, our EcoBarrier™ mono-material containers match the moisture resistance of conventional co-extruded bottles without multi-layer delamination hazards.</p>

      <div class="blog-full-image">
        <img src="/blog-card-1.webp" alt="Sustainable polymer innovation" />
      </div>

      <p>By maintaining a single polymer stream throughout the bottle body and closure threads, our packaging achieves seamless sortation in standard municipal and industrial recycling streams.</p>

      <h2>Lifecycle Carbon Reduction in Automated Tooling</h2>
      <p>In addition to material circularity, our high-cavitation hot-runner tooling decreases cycle times by up to 22%, drastically reducing energy consumption per unit manufactured. Solar arrays at our Solan facility further power over 30% of day-shift operations.</p>
    `
  },
  {
    id: 'b-compliance',
    _id: 'b-compliance',
    title: 'Regulatory Compliance & DMF Filings: Safeguarding Child-Resistant Closures',
    slug: 'regulatory-compliance-dmf-filings-child-resistant-closures',
    excerpt: 'Navigating US FDA Drug Master Files (DMF), ISO 8317 child-resistant certifications, and batch-level traceability in critical healthcare packaging.',
    category: 'Quality & Compliance',
    coverImage: '/blog-card-2.webp',
    readTime: '6 min read',
    author: {
      name: 'Ashirwad Plastics Editorial Team',
      role: 'Quality Assurance & Regulatory Affairs',
      avatar: '/logo-icon-192.png'
    },
    tags: ['DMF', 'ISO 8317', 'Compliance', 'Quality Assurance', 'Child Resistant'],
    isPublished: true,
    featured: false,
    publishedAt: '2026-01-15T10:00:00.000Z',
    views: 0,
    contentHtml: `
      <p>Regulatory approval for pharmaceutical containment requires relentless documentation rigor. Ashirwad Plastics maintains active Type III Drug Master Files (DMF) with the United States Food and Drug Administration (US FDA), enabling seamless reference access for our domestic and multinational formulation partners during ANDA and NDA submissions.</p>

      <h2>Engineering Child-Resistance with Senior-Friendly Ergonomics</h2>
      <p>Under ISO 8317 and 16 CFR § 1700.20 standards, child-resistant closures must prevent opening by young children while remaining intuitive and accessible for elderly or arthritic patients. Our Push-and-Turn and Squeeze-and-Turn closure designs utilize precision spring-beam cantilevers that require dual-action mechanical activation.</p>

      <div class="blog-full-image">
        <img src="/blog-card-2.webp" alt="Child-resistant closure testing" />
      </div>

      <h2>Batch-Level Traceability and Extractables/Leachables Profiles</h2>
      <p>All packaging components are manufactured from pre-screened raw materials tested in accordance with USP <661.1> (Plastic Materials of Construction) and USP <661.2> (Plastic Packaging Systems). Full digital certificates of analysis (CoA) accompany every lot, documenting melt flow index, tensile yield, and extractable screening results.</p>
    `
  }
];

const getStoredBlogs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BLOGS));
      return SEED_BLOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_BLOGS;
  } catch (e) {
    return SEED_BLOGS;
  }
};

const saveStoredBlogs = (blogs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  } catch (e) {
    console.error('Failed to save blogs to localStorage', e);
  }
};

export const blogService = {
  async getPublishedBlogs({ category = 'All', search = '' } = {}) {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());
      
      const res = await fetch(`${API_BASE_URL}/blogs?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.blogs?.length > 0) {
          return json.data.blogs;
        }
      }
    } catch (e) {
      // Backend unavailable, fallback to local storage
    }

    let blogs = getStoredBlogs().filter((b) => b.isPublished);

    if (category && category !== 'All') {
      blogs = blogs.filter((b) => b.category?.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      blogs = blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q)
      );
    }

    return blogs.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));
  },

  async getBlogBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${slug}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.blog) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback to local
    }

    const blogs = getStoredBlogs();
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) return null;

    const related = blogs
      .filter((b) => b.slug !== slug && b.isPublished)
      .slice(0, 3);

    return { blog, related };
  },

  async recordBlogView(slug) {
    if (!slug || typeof window === 'undefined') return;
    // Do not count views when an admin is logged in and previewing
    if (localStorage.getItem('ashirwad_admin_token')) return;

    try {
      const viewedRaw = sessionStorage.getItem('ashirwad_viewed_blogs');
      const viewedSlugs = viewedRaw ? JSON.parse(viewedRaw) : [];
      if (viewedSlugs.includes(slug)) return;

      // Mark as viewed immediately to prevent duplicate calls (e.g. React StrictMode)
      sessionStorage.setItem('ashirwad_viewed_blogs', JSON.stringify([...viewedSlugs, slug]));

      let visitorId = localStorage.getItem('ashirwad_visitor_id');
      if (!visitorId) {
        visitorId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem('ashirwad_visitor_id', visitorId);
      }

      await fetch(`${API_BASE_URL}/blogs/${encodeURIComponent(slug)}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId })
      });
    } catch {
      // Non-blocking analytics call
    }
  },

  async getAdminBlogs(token) {
    try {
      if (token) {
        const res = await fetch(`${API_BASE_URL}/blogs/admin/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.blogs) {
            return json.data.blogs;
          }
        }
      }
    } catch (e) {
      // Fallback
    }

    return getStoredBlogs().sort(
      (a, b) => new Date(b.updatedAt || b.publishedAt || 0) - new Date(a.updatedAt || a.publishedAt || 0)
    );
  },

  async saveBlog(blogData, token) {
    let savedBlog = null;

    if (token) {
      try {
        const isUpdate = Boolean(blogData._id || blogData.id);
        const url = isUpdate
          ? `${API_BASE_URL}/blogs/${blogData._id || blogData.id}`
          : `${API_BASE_URL}/blogs`;
        const method = isUpdate ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(blogData)
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            savedBlog = json.data;
          }
        }
      } catch (e) {
        console.warn('Backend blog sync failed:', e.message);
      }
    }

    const blogs = getStoredBlogs();
    const idToFind = blogData._id || blogData.id;

    if (idToFind) {
      const idx = blogs.findIndex((b) => (b._id || b.id) === idToFind);
      if (idx !== -1) {
        blogs[idx] = {
          ...blogs[idx],
          ...blogData,
          ...(savedBlog || {}),
          updatedAt: new Date().toISOString()
        };
        savedBlog = blogs[idx];
      } else {
        const item = {
          ...blogData,
          id: idToFind,
          _id: idToFind,
          updatedAt: new Date().toISOString()
        };
        blogs.unshift(item);
        savedBlog = item;
      }
    } else {
      const newId = `b-${Date.now()}`;
      const item = {
        ...blogData,
        id: newId,
        _id: newId,
        views: 0,
        publishedAt: blogData.isPublished ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      blogs.unshift(item);
      savedBlog = item;
    }

    saveStoredBlogs(blogs);
    return savedBlog;
  },

  async deleteBlog(id, token) {
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/blogs/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        // Continue to delete locally
      }
    }

    const blogs = getStoredBlogs().filter((b) => (b._id || b.id) !== id);
    saveStoredBlogs(blogs);
    return true;
  },

  async togglePublish(id, token) {
    if (token) {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/${id}/publish`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const blogs = getStoredBlogs();
            const idx = blogs.findIndex((b) => (b._id || b.id) === id);
            if (idx !== -1) {
              blogs[idx] = json.data;
              saveStoredBlogs(blogs);
            }
            return json.data;
          }
        }
      } catch (e) {
        // Fallback
      }
    }

    const blogs = getStoredBlogs();
    const blog = blogs.find((b) => (b._id || b.id) === id);
    if (blog) {
      blog.isPublished = !blog.isPublished;
      if (blog.isPublished && !blog.publishedAt) {
        blog.publishedAt = new Date().toISOString();
      }
      blog.updatedAt = new Date().toISOString();
      saveStoredBlogs(blogs);
      return blog;
    }
    return null;
  }
};
