import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase URL or Service Role Key missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const ensureStorageBucket = async (bucketName) => {
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) throw listError;
    
    const bucketExists = buckets.find(b => b.name === bucketName);
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
      if (createError) throw createError;
      console.log(`✅ Supabase Storage bucket '${bucketName}' created successfully.`);
    }
  } catch (error) {
    console.error(`❌ Error ensuring Supabase bucket '${bucketName}':`, error.message);
  }
};
