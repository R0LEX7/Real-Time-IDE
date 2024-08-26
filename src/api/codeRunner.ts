import { languages } from "@/constant";

export async function executeCode(code: string, language: { language: string; id: string; version: string }) {
  console.log("language :", language);
  try {
    // Find the language ID based on the language name


    if (!language) {
      console.error("Language not supported.");
      return;
    }

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language.id,
        version: language.version,
        files: [
            {
              name: 'main', // This can be any name, typically main or index
              content: code,
            },
          ],
      }),
    });

    const result = await response.json();
    console.log("Output:", result);
    if(result?.run?.output){
        return result?.run?.output
    }else throw Error ("Internal Server Error")
  } catch (error) {
    console.log("Error", error);
    throw Error("Internal Server Error ");
  }
}
