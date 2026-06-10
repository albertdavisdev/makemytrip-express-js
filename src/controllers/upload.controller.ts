import { Request, Response } from "express";

export const uploadSingleFile = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const file = files[0];

  res.json({
    success: true,
    message: "File uploaded successfully",
    data: {
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      url: `http://localhost:3000/uploads/${file.filename}`,
      fieldName: file.fieldname,
    },
  });
};
