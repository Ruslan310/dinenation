import aws from 'aws-sdk';
import {region} from "./constants";

export async function main() {
  const s3 = new aws.S3({region});

  const params = {
    Bucket: 'bucket-for-image-test',
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const image_rout = "https://bucket-for-user-image.s3.amazonaws.com/"
    if (data.Contents) {
      const imageKeys = data.Contents.map((object) => `${image_rout}${object.Key}`);

      return {
        statusCode: 200,
        body: JSON.stringify({ images: imageKeys }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ images: [] }),
      };
    }
  } catch (err) {
    console.error('Error fetching images:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching images' }),
    };
  }
}
