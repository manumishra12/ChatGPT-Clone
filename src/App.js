// import './App.css';
// import gptLogo from './assets/chatgpt.svg';
// import addBtn from './assets/add-30.png';
// import msg from './assets/message.svg';
// import home from './assets/home.svg';
// import saved from './assets/bookmark.svg';
// import upgrade from './assets/rocket.svg';
// import send from './assets/send.svg';
// import user from './assets/userr.png';
// import gptImg from './assets/chatgptLogo.svg';
// import { OpenAI } from 'openai';

// // import { sendMsgToOpenAI } from './openai';
// import { useState } from 'react';



// function App() {
//   const openai = new OpenAI({
//     apiKey:process.env.REACT_APP_OPENAI_API_KEY,
//   })

//   // const openai= new OpenAI(config);
//   const [prompt,setPrompt]=useState('');
//   const [result,setResult]=useState('');
  

//   // const [input, setInput] = useState("");

//   // const handleSend = async () => {
//   //   console.log(input);
//   //   const res = await sendMsgToOpenAI(input);
//   //   console.log(res);
//   // }

//   const handleChange=async ()=>{
//     try{
//       const response = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: prompt,
//         temperature: 0.7,
//         max_tokens: 350,
//         top_p: 1,
//         frequency_penalty: 0,
//         presense_penalty: 0
//       })
//       setResult(response.data.choice[0].text)
//     } catch(error){
//       console.log(error);
//     }
//   }

//   return (
//     <div className="App">
//       <div className="sideBar">
//         {/* Upper Side */}
//         <div className="upperSide">
//           {/* Top -- Logo & New Chat*/}
//           <div className="upperSideTop">
//             <img src={gptLogo} alt="Logo" className="logo" />
//             <span className="brand">ChatGPT</span>
//           </div>

//           <button className="midBtn">
//             <img src={addBtn} alt="New Chat" className="addBtn" />New Chat
//           </button>

//           {/* Bottom -- Prev Questions*/}
//           <div className="upperSidebottom">
//             <button className="query">
//               <img src={msg} alt="Query.1" />How to create Quantum AI ?
//             </button>

//             <button className="query">
//               <img src={msg} alt="Query.2" />How does CUDA works ?
//             </button>
//           </div>
//         </div>

//         {/* Lower Side */}
//         <div className="lowerSide">
//           <div className="listItems">
//             <img src={home} alt="Home" className="listItemsImg" />Home
//           </div>

//           <div className="listItems">
//             <img src={saved} alt="Saved" className="listItemsImg" />Saved
//           </div>

//           <div className="listItems">
//             <img src={upgrade} alt="Upgrade" className="listItemsImg" />Upgrade to Pro
//           </div>
//         </div>
//       </div>


//       {/* Main Side */}
//       <div className="main">
//         <div className="chats">
//           <div className="chat">
//             <img className="chatImg"  src={user} alt="User" />
//             <p className="txt">How we can start with the AI Development career ? Give the complete roadmanp and description for that in the pdf form.</p>
//           </div>

//           <div className="chat bot">
//             <img className="chatImg" src={gptImg} alt="GPT Logo" />
//             <p className="txt">
//             AI developers build intelligent systems that can perform tasks that usually require human intelligence. These tasks include: 
//             Natural language processing
//             Computer vision
//             Machine learning
//             Data analysis
//             AI can be used in many areas, including: 
//             Healthcare
//             AI can help with patient monitoring, reducing healthcare costs, and improving medical efficiency. It can also help with developing new medications and predicting how patients will respond to certain therapies.
//             Automation
//             AI can handle routine and administrative tasks, as well as complex physical world tasks that require adaptability and agility.
//             AI is a dynamic and ever-evolving field. Some basic concepts of AI include: 
//             Machine learning
//             Natural language processing
//             Computer vision
//             Robotics

//             AI developers build intelligent systems that can perform tasks that usually require human intelligence. These tasks include: 
//             Natural language processing
//             Computer vision
//             Machine learning
//             Data analysis
//             AI can be used in many areas, including: 
//             Healthcare
//             AI can help with patient monitoring, reducing healthcare costs, and improving medical efficiency. It can also help with developing new medications and predicting how patients will respond to certain therapies.
//             Automation
//             AI can handle routine and administrative tasks, as well as complex physical world tasks that require adaptability and agility.
//             AI is a dynamic and ever-evolving field. Some basic concepts of AI include: 
//             Machine learning
//             Natural language processing
//             Computer vision
//             Robotics

//             </p>
//           </div>
//         </div>
        
//         {/* Chat or Message send area */}
//         <div className="chatFooter">
//           <div className="inp">
//             <input type="text" placeholder='Send a message' 
//             value={prompt}
//             onChange={(e) => {setPrompt(e.target.value)}} />
//             <button className="send" onClick={handleChange}>
//               <img src={send} alt="Send " />
//             </button>

//             <p>
//               {result}
//             </p>

//             {/* <input type="text" placeholder='Send a message' value={input} onChange={(e)=>{setInput(e.target.value)}} />
//             <button className="send" onClick={handleSend}> 
//               <img src={send} alt="Send " />
//             </button> */}

//           </div>

//           <p>ChatGPT may generate some inaccurate result and fact as well. GPT Version 0.0.1</p>
 

//         </div>

//       </div>
//     </div>
//   );
// }

// export default App;


import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msg from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import upgrade from './assets/rocket.svg';
import send from './assets/send.svg';
import user from './assets/userr.png';
import gptImg from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';
import './openai.js';


function App() {

  // Auto Scrolling Hook
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi I am ChatGPT, an AI language model developed by Manu Mishra for user multi-tasking and efficiency.",
      isBot: true,
    }
  ]);

  // Auto Scrolling feature
  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text: text, isBot: false}
    ])

    // Differentiating btw Bot and User message 
    const res = await sendMsgToOpenAI(text);
    console.log(res);
    setMessages([
      ...messages,
      {text: text, isBot: false},
      {text: res, isBot: true}
    ]);
  }

  //Enter key to send query
  const handleEnter = async (e) =>{
    if(e.key === 'Enter') await handleSend();
  }

  //Previous Query or Questions
  const handleQuery = async (e) =>{
    const text = e.target.value;
    setMessages([
      ...messages,
      {text: text, isBot: false}
    ])

    // Differentiating btw Bot and User message 
    const res = await sendMsgToOpenAI(text);
    console.log(res);
    setMessages([
      ...messages,
      {text: text, isBot: false},
      {text: res, isBot: true}
    ]);

  }

  return (
    <div className="App">
      <div className="sideBar">
        {/* Upper Side */}
        <div className="upperSide">
          {/* Top -- Logo & New Chat*/}
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>

          <button className="midBtn" onClick={()=>{window.location.reload()}}>
            <img src={addBtn} alt="New Chat" className="addBtn" />New Chat
          </button>

          {/* Bottom -- Prev Questions*/}
          <div className="upperSidebottom">
            <button className="query" onClick={handleQuery} value={"How to create Quantum AI ?"}>
              <img src={msg} alt="Query.1" />How to create Quantum AI ?
            </button>

            <button className="query" onClick={handleQuery} value={"How does CUDA works ?"}>
              <img src={msg} alt="Query.2" />How does CUDA works ?
            </button>
          </div>
        </div>

        {/* Lower Side */}
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listItemsImg" />Home
          </div>

          <div className="listItems">
            <img src={saved} alt="Saved" className="listItemsImg" />Saved
          </div>

          <div className="listItems">
            <img src={upgrade} alt="Upgrade" className="listItemsImg" />Upgrade to Pro
          </div>
        </div>
      </div>


      {/* Main Side */}
      <div className="main">
        <div className="chats">

          {/* Dummy Chat -- User and GPT */}
          {/* <div className="chat">
            <img className="chatImg"  src={user} alt="User" />
            <p className="txt">How we can start with the AI Development career ? Give the complete roadmap and description for that in the pdf form.</p>
          </div>

          <div className="chat bot">
            <img className="chatImg" src={gptImg} alt="GPT Logo" />
            <p className="txt">
            As an AI developer, your journey begins with a strong foundation in mathematics and programming. Understanding linear algebra, calculus, probability, and statistics is crucial, along with proficiency in languages like Python, R, or Julia. Once you have grasped these fundamentals, delve into machine learning, exploring supervised and unsupervised learning, reinforcement learning, and popular algorithms. Familiarize yourself with frameworks such as TensorFlow, Keras, PyTorch, and scikit-learn to implement these concepts.
            Deep learning should be the next focus, delving into neural networks, different architectures like CNNs and RNNs, and advanced topics including transfer learning and model deployment. Additionally, gaining expertise in natural language processing (NLP) and computer vision (CV) will broaden your skill set. Understand text processing, NLP libraries like NLTK and spaCy, as well as CV concepts like image processing and libraries such as OpenCV.
            Reinforcement learning and model deployment on cloud platforms are essential components of the roadmap. Finally, an understanding of ethics and bias in AI is crucial for responsible development. This structured roadmap will provide a clear path for your growth as an AI developer.
            </p>
          </div> */}

          {messages.map((message, i) =>
                    <div key= {i} className={message.isBot?"chat bot":"chat"}>
                      <img className="chatImg" src={message.isBot?gptImg:user} alt="GPT Logo" />
                      <p className="txt">
                        {message.text}
                      </p>
                    </div>
          )}
          
          <div ref={msgEnd} />
        </div>
        
        {/* Chat or Message send area */}
        <div className="chatFooter">
          <div className="inp">
            {/* <input type="text" placeholder='Send a message' />
            <button className="send"></button> */}

            <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} />
            <button className="send" onClick={handleSend}> 
              <img src={send} alt="Send " />
            </button>

            {/* <input type="text" placeholder='Send a message' value={input} onChange={(e)=>{setInput(e.target.value)}} />
            <button className="send" onClick={handleSend}> 
              <img src={send} alt="Send " />
            </button> */}

          </div>

          <p>ChatGPT may generate some inaccurate result and fact as well. GPT Version 0.0.1</p>
 

        </div>

      </div>
    </div>
  );
}

export default App;
