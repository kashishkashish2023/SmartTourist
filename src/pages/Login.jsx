/*import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { ArrowLeft, Lock, Mail } from "react-feather";

function Login() {

  const handleGoogleLogin = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
  };

  return (
    <div className="auth-page">

      <Link to="/" className="back-home">
        <ArrowLeft size={18} />
        Back to Home
      </Link>


      <div className="auth-card">

        <div className="auth-logo">
          🌍
        </div>


        <h1>Welcome Back!</h1>

        <p>
          Login to continue your smart travel journey
        </p>


        <form>

          <div className="input-box">
            <Mail size={20}/>
            <input 
              type="email"
              placeholder="Email Address"
            />
          </div>


          <div className="input-box">
            <Lock size={20}/>
            <input 
              type="password"
              placeholder="Password"
            />
          </div>


          <button type="submit">
            Login
          </button>

        </form>


        <div className="divider">
          OR
        </div>


        <div className="google-btn">

          <GoogleLogin
            onSuccess={handleGoogleLogin}

            onError={() => {
              console.log("Google Login Failed");
            }}
          />

        </div>


        <div className="switch-auth">

          Don't have an account?

          <Link to="/signup">
            Signup
          </Link>

        </div>


      </div>

    </div>
  );
}

export default Login;*/

/*import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ArrowLeft, Lock, Mail } from "react-feather";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("https://smarttourist-mf35.onrender.com/api/auth/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })

      });

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("user", JSON.stringify(data.user));

        alert(data.message);

        navigate("/");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  const handleGoogleLogin = async (credentialResponse) => {

    try {

      const decoded = jwtDecode(credentialResponse.credential);

      const response = await fetch("https://smarttourist-mf35.onrender.com/api/auth/google", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          name: decoded.name,
          email: decoded.email

        })

      });

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("user", JSON.stringify(data.user));

        alert(data.message);

        navigate("/");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Google Login Failed");

    }

  };

  return (

    <div className="auth-page">

      <Link to="/" className="back-home">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      <div className="auth-card">

        <div className="auth-logo">
          🌍
        </div>

        <h1>Welcome Back!</h1>

        <p>
          Login to continue your smart travel journey
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-box">
            <Mail size={20}/>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <Lock size={20}/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <div className="divider">
          OR
        </div>

        <div className="google-btn">

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />

        </div>

        <div className="switch-auth">

          Don't have an account?

          <Link to="/signup">
            Signup
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Login;*/



/*import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { ArrowLeft, Lock, Mail } from "react-feather";
import { useState } from "react";


function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  const handleLogin = async (e)=>{

    e.preventDefault();


    try{


      const response = await fetch(
        "https://smarttourist-mf35.onrender.com/api/auth/login",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            email,
            password

          })

        }
      );


      const data = await response.json();


      if(response.ok){


        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );


        alert(data.message);

        navigate("/");


      }
      else{


        alert(data.message);


      }



    }
    catch(error){

      console.log(error);

      alert("Login Failed");

    }


  };





  const handleGoogleLogin = async (credentialResponse)=>{


    try{


      const response = await fetch(
        "https://smarttourist-mf35.onrender.com/api/auth/google",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },


          body:JSON.stringify({

            credential:credentialResponse.credential

          })


        }
      );



      const data = await response.json();



      if(response.ok){


        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );


        alert(data.message);


        navigate("/");


      }
      else{


        alert(data.message);


      }


    }
    catch(error){


      console.log(error);

      alert("Google Login Failed");


    }


  };





  return (

    <div className="auth-page">


      <Link to="/" className="back-home">

        <ArrowLeft size={18}/>

        Back to Home

      </Link>




      <div className="auth-card">


        <div className="auth-logo">

          🌍

        </div>



        <h1>

          Welcome Back!

        </h1>



        <p>

          Login to continue your smart travel journey

        </p>




        <form onSubmit={handleLogin}>


          <div className="input-box">

            <Mail size={20}/>

            <input

              type="email"

              placeholder="Email Address"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

            />

          </div>




          <div className="input-box">

            <Lock size={20}/>

            <input

              type="password"

              placeholder="Password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

            />

          </div>



          <button type="submit">

            Login

          </button>



        </form>




        <div className="divider">

          OR

        </div>



        <div className="google-btn">


          <GoogleLogin

            onSuccess={handleGoogleLogin}

            onError={()=>alert("Google Login Failed")}

          />


        </div>




        <div className="switch-auth">

          Don't have an account?


          <Link to="/signup">

            Signup

          </Link>


        </div>



      </div>


    </div>

  );


  }


export default Login;*/

import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ArrowLeft, Lock, Mail } from "react-feather";
import { useState } from "react";


function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  const handleLogin = async(e)=>{

    e.preventDefault();


    try{


      const response = await fetch(
        "https://smarttourist-mf35.onrender.com/api/auth/login",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            email,
            password
          })

        }
      );


      const data = await response.json();


      if(response.ok){

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );


        alert(data.message);

        navigate("/");


      }
      else{

        alert(data.message);

      }


    }
    catch(error){

      console.log(error);

      alert("Login Failed");

    }


  };




  const handleGoogleLogin = async(credentialResponse)=>{


    try{


      const decoded = jwtDecode(
        credentialResponse.credential
      );


      const response = await fetch(
        "https://smarttourist-mf35.onrender.com/api/auth/google",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },


          body:JSON.stringify({

            name:decoded.name,

            email:decoded.email

          })

        }
      );



      const data = await response.json();



      if(response.ok){


        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );


        alert(data.message);

        navigate("/");


      }
      else{

        alert(data.message);

      }


    }
    catch(error){

      console.log(error);

      alert("Google Login Failed");

    }


  };





  return (

    <div className="auth-page">


      <Link to="/" className="back-home">

        <ArrowLeft size={18}/>

        Back to Home

      </Link>



      <div className="auth-card">


        <div className="auth-logo">
          🌍
        </div>


        <h1>
          Welcome Back!
        </h1>


        <p>
          Login to continue your smart travel journey
        </p>



        <form onSubmit={handleLogin}>


          <div className="input-box">

            <Mail size={20}/>

            <input

              type="email"

              placeholder="Email Address"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

            />

          </div>



          <div className="input-box">

            <Lock size={20}/>

            <input

              type="password"

              placeholder="Password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

            />

          </div>



          <button type="submit">

            Login

          </button>



        </form>



        <div className="divider">
          OR
        </div>



        <GoogleLogin

          onSuccess={handleGoogleLogin}

          onError={()=>{

            alert("Google Login Failed");

          }}

        />



        <div className="switch-auth">

          Don't have an account?

          <Link to="/signup">

            Signup

          </Link>

        </div>



      </div>


    </div>

  );

}


export default Login;