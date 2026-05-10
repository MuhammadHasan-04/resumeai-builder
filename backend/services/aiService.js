import dotenv from "dotenv";
dotenv.config();

import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API,
});

async function parseResumeAI(resumeText) {
  try {
    // Safety check
    resumeText = (resumeText || "")
      .toString()
      .replace(/[^\x00-\x7F]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    console.log("Resume text:", resumeText);

    const prompt = `
You are an expert resume parser.

Extract structured JSON from the resume text.

Return JSON with this structure:

{
  "info": {
    "fullName": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "summary": ""
  },
  "experience": [
    {
      "title": "",
      "company": "",
      "dates": "",
      "description": ""
    }
  ],
  "education": [
    {
      "degree": "",
      "school": "",
      "year": "",
      "location": ""
    }
  ],
  "skills": {
    "technical": "",
    "tools": ""
  },
  "projects": [
    {
      "title": "",
      "tech": "",
      "link": "",
      "description": ""
    }
  ]
}

Resume text:
${resumeText}

Return ONLY JSON.
`;

    const stream = await openRouter.chat.send({
      chatGenerationParams: {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [{ role: "user", content: prompt }],
        stream: true,
        max_tokens: 1500,
      },
    });

    let fullContent = "";

    console.log("AI parsing started...\n");

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;

      if (content) {
        process.stdout.write(content);
        fullContent += content;
      }

      if (chunk.usage) {
        console.log("\nUsage:", chunk.usage);
      }
    }

    console.log("\n\nAI generation finished\n");

    // Remove markdown formatting if present
    fullContent = fullContent.replace(/```json|```/g, "").trim();

    let parsedJSON;

    try {
      parsedJSON = JSON.parse(fullContent);
    } catch (err) {
      console.log("\n⚠ AI returned invalid JSON:");
      console.log(fullContent);

      throw new Error("AI returned incomplete JSON");
    }

    return parsedJSON;
  } catch (error) {
    console.error("AI Resume Parsing Error:", error.message);

    // fallback structure
    return {
      info: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
      },
      experience: [{ title: "", company: "", dates: "", description: "" }],
      education: [{ degree: "", school: "", year: "", location: "" }],
      skills: {
        technical: "",
        tools: "",
      },
      projects: [{ title: "", tech: "", link: "", description: "" }],
    };
  }
}

export { parseResumeAI };
