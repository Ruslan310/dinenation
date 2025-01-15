import aws from 'aws-sdk';
import {promisify} from "util";
import crypto from 'crypto';
import {region} from "./constants";

const randomBytes = promisify(crypto.randomBytes)

export async function main() {
  const s3 = new aws.S3({
    region,
    signatureVersion: "v4"
  });
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = {
    Bucket: 'bucket-for-review',
    Key: imageName,
    Expires: 60
  }
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return {
    statusCode: 200,
    body: uploadURL,
  };
}
