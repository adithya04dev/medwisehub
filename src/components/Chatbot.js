import React, { useState } from 'react';
import { ChatOpenAI } from "langchain/chat_models/openai";


import { PromptTemplate } from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { BufferMemory } from "langchain/memory";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BufferWindowMemory } from "langchain/memory";

import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ResponsiveDrawer from './Navbar';
import PermanentDrawerLeft from './Navbar';
const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  // const chat = new OpenAI({temperature: 0.9,
  //   openAIApiKey: "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",modelName: "gpt-3.5-turbo-16k"});
    const chat = new ChatOpenAI({temperature: 0.9,
      openAIApiKey: "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",modelName: "gpt-3.5-turbo-16k"});

    const memory = new BufferWindowMemory({ returnMessages: true, memoryKey: "history",k:100 })
    const chatPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are  chatbot anwer to user queries.",
      ],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);  
    // const chain = new ConversationChain({ llm: chat, memory: memory });
    
    const chain = new ConversationChain({
      memory: memory,
      prompt: chatPrompt,
      llm: chat,
    });

  // const chat = new ChatOpenAI({});

  const handleUserInput = async () => {
    
    console.log(userInput);
    const newMessage = { role: 'user', content: userInput };
    setChatHistory((prevChat) => [...prevChat, newMessage]);

    // const chatResponse = await chatOpenAI.invoke([
    //   { role: 'user', content: userInput },
    // ]);
    
    const input1=userInput;
    setUserInput('');

    const response = await chain.call({
      input: input1,
    });


   
    
    
    // const response = await chain.call({
    //   input: input,
    // });
    console.log(memory);
    // console.log(response.response);

    const systemMessage = { role: 'system', content: response.response };
  
    setChatHistory((prevChat) => [...prevChat, systemMessage]);
    console.log(chatHistory);
  };

  return (
    <div>
      <PermanentDrawerLeft/>
    <div className="chatbot-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <Card key={index} sx={{ width: '800px', margin: '10px',marginLeft:'170px',         backgroundColor: message.role === 'system' ? 'lightblue' : 'lightgreen',
        }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  {message.role === 'system' ? 'Doctor:' : 'User:'}
                </Typography>
                <Typography variant="body2">
                  {message.content}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      
    </div>
    <div className="user-input">
        <input
          type="text" 
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          style={{ width:"700px", padding: '5px', marginLeft: '150px',marginBottom:'10px',height:'100px'}} // Adjust styles as needed
          placeholder='Interact with doctor'
        />
        <button onClick={handleUserInput}      style={{ height:'70px',width:'110px', margin:'20px', backgroundColor: '#007bff', color: 'white',  cursor: 'pointer' }} // Adjust styles as needed
 >
          Ask Doctor
        </button>
      </div>
    </div>
  );
  
};

export default Chatbot;
