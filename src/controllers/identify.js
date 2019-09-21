import { client } from 'algorithmia';
import googleVision from '@google-cloud/vision';
import { successResponse, failureResponse } from '../utils/http-responses';
import { buildAlgorithmiaAlgorithm } from '../utils/helpers';

const vision = new googleVision.ImageAnnotatorClient();

const algorithm = buildAlgorithmiaAlgorithm({
  name: 'ProgrammingLanguageIdentification',
  author: 'PetiteProgrammer',
  version: '0.1.3',
});

const identify = async (req, res) => {
  if (!req.body.imageURL) {
    failureResponse({ res, message: "Missing 'imageURL' parameter in the body" });
  }

  try {
    const result = await vision.textDetection(req.body.imageURL);
    const script = result[0].textAnnotations[0].description;
    const identify = await client(process.env.ALGORITHMIA_KEY)
      .algo(algorithm)
      .pipe(script);

    successResponse({
      res,
      data: {
        script,
        language: {
          name: identify.get()[0][0],
          percentage: identify.get()[0][1],
        },
      },
    });
  } catch (error) {
    failureResponse({
      res,
      error,
      code: 500,
      message: 'Something went wrong',
    });
  }
};

export { identify };
