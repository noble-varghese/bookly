


// pages/api/upload-image.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// export async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) 

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    console.log('-========>>>>>>>>>>>>>')
    console.log('-========>>>>>>>>>>>>>')
    console.log('-========>>>>>>>>>>>>>')
    console.log('-========>>>>>>>>>>>>>')
    console.log('-========>>>>>>>>>>>>>')
    console.log('-========>>>>>>>>>>>>>')
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Generate a unique filename
    const fileName = `${randomUUID().toString()}-${file.name}`;

    // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer();

    // Upload to Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('image-store')
      .upload(`covers/${fileName}`, buffer, {
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600'
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ message: 'Error uploading to Supabase', error }, { status: 500 });
    }

    // Get the public URL for the uploaded file
    const { data: urlData } = supabase
      .storage
      .from('image-store')
      .getPublicUrl(`covers/${fileName}`);

    // Return the URL
    return NextResponse.json({ 
      success: true, 
      url: urlData.publicUrl 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Error processing upload', error }, { status: 500 });
  }
}