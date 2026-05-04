import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

async function extractFile(file) {
  console.log("[extractFile] mimetype:", file.mimetype);
  console.log("[extractFile] originalname:", file.originalname);

  // PDF extraction
  if (file.mimetype === "application/pdf") {
    // console.log("Hello 1");

    const parser = new PDFParse({
      data: file.buffer,
    });

    const result = await parser.getText();
    // console.log(result);

    await parser.destroy();

  console.log("[extractFile] pdf text length:", result.text?.length || 0);

    // console.log("Hello 2");

    return result.text;
  }

  // DOCX extraction
  if (file.mimetype.includes("word")) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    console.log("[extractFile] docx text length:", result.value?.length || 0);

    return result.value;
  }

  console.error("[extractFile] unsupported file type:", file.mimetype);
  throw new Error("Unsupported file type");
}

export { extractFile };
