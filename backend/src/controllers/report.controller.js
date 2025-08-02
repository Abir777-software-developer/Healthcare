
import PDFParser from "pdf2json"

const extractTextFromPdf = async (filePath) => {
  try {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData) => {
        reject(errData.parserError);
      });

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        let text = "";
        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((textItem) => {
            textItem.R.forEach((textRun) => {
              text += decodeURIComponent(textRun.T) + "";
            });
          });
        });
        resolve(text);
      });

      pdfParser.loadPDF(filePath);
    });
  } catch (error) {
    console.log("error while extracting text from pdf");
  }
};

const handleReport = async (req, res) => {
  try {
    // console.log(req.files.report[0])
    
    const file = req.files?.report[0];
    console.log(file);

    if(!file){
      return res
      .status(400)
      .json({message : "pdf file is required"})
    }

    if(file.mimetype !== "application/pdf"){
      return res
      .status(400)
      .json({message : "file type should be pdf"})
    }

    const extractedText = await extractTextFromPdf(file.path);
    console.log(extractedText)

    // todo : 
    // connect to gemini api
    
  } catch (error) {
    console.log("error in report handling controller", error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

export { handleReport };
