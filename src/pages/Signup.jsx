/*import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock } from "react-feather";

function Signup() {

  const navigate = useNavigate();

  const handleGoogleSignup = async (credentialResponse) => {

    try {

      const decoded = jwtDecode(credentialResponse.credential);

      console.log(decoded);

      const response = await fetch("http://localhost:5000/api/auth/google", {

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

      console.log(data);

      if (response.ok) {

        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Google Login Successful");

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
          ✈️
        </div>

        <h1>Create Account</h1>

        <p>
          Join Smart Tourism and explore the world
        </p>

        <form>

          <div className="input-box">
            <User size={20} />
            <input
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="input-box">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <div className="input-box">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Create Password"
            />
          </div>

          <button type="button">
            Signup
          </button>

        </form>

        <div className="divider">
          OR
        </div>

        <div className="google-btn">

          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => {
              alert("Google Signup Failed");
            }}
          />

        </div>

        <div className="switch-auth">
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>

  );
}

export default Signup;*/

/*import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock } from "react-feather";
import { useState } from "react";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const response = await fetch("http://localhost:5000/api/auth/signup", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password
        })

      });

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        navigate("/login");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

    }

  };

  const handleGoogleSignup = async (credentialResponse) => {

    try {

      const decoded = jwtDecode(credentialResponse.credential);

      console.log(decoded);

      const response = await fetch("http://localhost:5000/api/auth/google", {

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

      console.log(data);

      if (response.ok) {

        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Google Login Successful");

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
          ✈️
        </div>

        <h1>Create Account</h1>

        <p>
          Join Smart Tourism and explore the world
        </p>

        <form>

          <div className="input-box">
            <User size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleSignup}
          >
            Signup
          </button>

        </form>

        <div className="divider">
          OR
        </div>

        <div className="google-btn">

          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => {
              alert("Google Signup Failed");
            }}
          />

        </div>

        <div className="switch-auth">
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>

  );
}

export default Signup;*/

/*import { Link,useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { ArrowLeft,User,Mail,Lock } from "react-feather";
import { useState } from "react";


function Signup(){


const navigate = useNavigate();


const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");





const handleSignup = async(e)=>{


e.preventDefault();


try{


const response = await fetch(
"http://localhost:5000/api/auth/signup",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
email,
password

})

});


const data = await response.json();



if(response.ok){

alert(data.message);

navigate("/login");

}
else{

alert(data.message);

}



}
catch(error){

console.log(error);

alert("Signup Failed");

}



};





const handleGoogleSignup = async(credentialResponse)=>{


try{


const response = await fetch(
"http://localhost:5000/api/auth/google",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

credential:credentialResponse.credential

})

});


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

alert("Google Signup Failed");


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

✈️

</div>



<h1>

Create Account

</h1>



<p>

Join Smart Tourism and explore the world

</p>



<form onSubmit={handleSignup}>


<div className="input-box">

<User size={20}/>

<input

type="text"

placeholder="Full Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>

</div>




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

placeholder="Create Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

</div>




<button type="submit">

Signup

</button>


</form>




<div className="divider">

OR

</div>



<div className="google-btn">


<GoogleLogin

onSuccess={handleGoogleSignup}

onError={()=>alert("Google Signup Failed")}

/>


</div>



<div className="switch-auth">

Already have an account?


<Link to="/login">

Login

</Link>


</div>



</div>


</div>


);


}


export default Signup;*/


import { Link,useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ArrowLeft,User,Mail,Lock } from "react-feather";
import { useState } from "react";



function Signup(){


const navigate = useNavigate();


const [name,setName] = useState("");

const [email,setEmail] = useState("");

const [password,setPassword] = useState("");




const handleSignup = async(e)=>{


e.preventDefault();


try{


const response = await fetch(
"http://localhost:5000/api/auth/signup",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
email,
password

})

});


const data = await response.json();



if(response.ok){


alert(data.message);

navigate("/login");


}
else{

alert(data.message);

}



}
catch(error){

console.log(error);

alert("Signup Failed");

}



};






const handleGoogleSignup = async(credentialResponse)=>{


try{


const decoded = jwtDecode(
credentialResponse.credential
);



const response = await fetch(
"http://localhost:5000/api/auth/google",
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

alert("Google Signup Failed");

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

✈️

</div>



<h1>
Create Account
</h1>



<p>
Join Smart Tourism and explore the world
</p>




<form onSubmit={handleSignup}>


<div className="input-box">

<User size={20}/>


<input

type="text"

placeholder="Full Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>


</div>




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

placeholder="Create Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


</div>




<button type="submit">

Signup

</button>



</form>





<div className="divider">

OR

</div>




<GoogleLogin

onSuccess={handleGoogleSignup}

onError={()=>{

alert("Google Signup Failed");

}}

/>




<div className="switch-auth">


Already have an account?


<Link to="/login">

Login

</Link>


</div>




</div>


</div>

);


}



export default Signup;