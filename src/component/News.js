import {useEffect, useState} from "react";
import cors from "cors";

export function News() {
    const [content, setContent] = useState("");
    const cors = require('cors');
    cors(this);
    useEffect(() => {
            fetch('https://vnexpress.net/rss/thoi-su.rss',
                {
                    method: 'GET',
                    crossDomain:true,
                    mode :'cors',
                    headers: {
                        'Content-Type':'application/xml',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        'Date': 'Mon, 18 Jul 2016 16:06:00 GMT',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
                        'Access-Control-Allow-Credentials': 'true',
                        'transfer-encoding': 'chunked',
                        'Connection': 'keep-alive',
                        'keep-alive': 'timeout=30',
                        'Vary': 'Accept-Encoding',
                        'Set-Cookie': 'PHPSESSID=4d1f6b8b0f0b4b3b3b3b3b3b3b3b3b3b; path=/; domain=.vnexpress.net; secure; HttpOnly',
                        'V-Cache': 'MISS',
                        'X-Cache': 'MISS',
                        'X-Frame-Options': 'SAMEORIGIN',
                        'Server': '3677whvidd10bf7c7468e873e79ba2ad31',
                    },
                }) .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    )
    ;
    return (<div>News</div>);
}