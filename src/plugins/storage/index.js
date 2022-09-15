import { S3Client } from '@aws-sdk/client-s3';

import config from '../../config/index.js';

async function init() {
  let s3;

  if (config.fileStorage === 'minio') {
    s3 = new S3Client({
      endpoint: config.minio.endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: config.minio.accessKeyId,
        secretAccessKey: config.minio.secretAccessKey,
      },
    });
  }

  if (config.fileStorage === 's3') {
    s3 = new S3Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });
  }

  return s3;
}

export default init;
