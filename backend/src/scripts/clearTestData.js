import mongoose from 'mongoose';
import { connectDB } from '../config/database.js';
import { Contact } from '../models/Contact.js';
import { Campaign } from '../models/Campaign.js';

const clearTestData = async () => {
  try {
    console.log('==================================================');
    console.log('🧹 Ashirwad Plastics - Test Data Cleanup Utility');
    console.log('==================================================');
    console.log('Connecting to MongoDB Atlas...');
    await connectDB();

    // 1. Fetch current counts
    const contactCount = await Contact.countDocuments();
    const campaignCount = await Campaign.countDocuments();

    console.log(`\nFound in database:`);
    console.log(`• Contacts: ${contactCount}`);
    console.log(`• Broadcast Campaigns & History: ${campaignCount}`);

    // 2. Delete test data
    console.log('\nPurging test records...');
    const deletedContacts = await Contact.deleteMany({});
    const deletedCampaigns = await Campaign.deleteMany({});

    console.log('--------------------------------------------------');
    console.log(`✅ Cleared ${deletedContacts.deletedCount} Contact(s)`);
    console.log(`✅ Cleared ${deletedCampaigns.deletedCount} Broadcast Campaign(s)`);
    console.log('ℹ️  Admin user credentials preserved intact.');
    console.log('==================================================');
    console.log('🎉 Database is clean and ready for production!');
    console.log('==================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Data cleanup failed:', error);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
};

clearTestData();
