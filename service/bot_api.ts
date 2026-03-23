import axiosInstance from "./api";

    let config = {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 3600000,
    };
    export async function askBot(data: {query: string}){
    const response = await axiosInstance.post("/chatbot",data,config);
    return response.data.answer;
    }