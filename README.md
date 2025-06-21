# AI-Powered Meeting Minutes Extractor
## **Overview** 
This project is a Node.js backend service that uses Google Gemini AI to automatically extract structured meeting minutes from raw meeting notes. It provides:
<li> A 2–3 sentence summary. </li>
<li> A list of key decisions. </li>
<li> A structured list of action items (with task, owner, and deadline if available). </li> <br>

## **Tech Stack used**
<li>Node.js (TypeScript)</li>
<li>Express.js</li>
<li>Google Gemini API</li>
<li>Multer (for file uploads)</li> <br>

## **Setup Instructions** <br>
1. CLone the repository:
   
   ```
   git clone https://github.com/rithikamchoudhary/AI-Meeting-Minutes.git
   cd ai-meeting-minutes
   ```
2. Install dependencies:

   ```
   npm install
   ```
3. Create a .env file in the root directory with the following content:

   ```
   GEMINI_API_KEY=your-gemini-api-key-here
   ```
  > Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4. Run the Server:
   
   ```
   npm run dev
   ```
   or
   ```
   npx ts-node src/index.ts
   ```
> The server will start on http://localhost:3000

## **Testing**
1. Test with Raw Text (curl)
   
   ```
   curl -X POST http://localhost:3000/process-meeting \
   -H "Content-Type: application/json" \
   -d '{"text": "Team Sync – May 26\n- We’ll launch the new product on June 10.\n- Ravi to prepare onboarding docs by June 5.\n- Priya will follow up with logistics team on packaging delay.\n- Beta users requested a mobile-first dashboard."}'
   ```

2. Test with a .txt File (curl)
   
   ```
   curl -X POST http://localhost:3000/process-meeting \
   -F "file=@samples/meeting1.txt"
   ```
4. Test with Postman
   
   - Raw Text: <br>
   
      + Method: POST <br>
      + URL: http://localhost:3000/process-meeting <br>
      + Body: raw, JSON, with a text field <br>
      
   - File Upload: <br>
   
     + Method: POST <br>
     + URL: http://localhost:3000/process-meeting <br>
     + Body: form-data, key: file, type: File, select your .txt file

## Sample Files

- Sample meeting notes are provided in the _samples/_ directory: <br>

    > samples/meeting1.txt
    
    > samples/meeting2.txt

## Sample Outputs

1. Output of the file _meeting1.txt_
   
  ```
{
    "summary": "The meeting focused on the upcoming launch of v2.0, scheduled for July 1st. Key discussion points included finalizing documentation and preparing a marketing announcement. Customer feedback on UI improvements was also reviewed.",
    "decisions": [],
    "actionItems": [
        {
            "task": "Finalize documentation",
            "owner": "Alex",
            "deadline": "June 25"
        },
        {
            "task": "Prepare announcement",
            "owner": "Marketing team",
            "deadline": null
        }
    ]
}
 ```

2. Output for the file _meeting2.txt_
   
```
{
    "summary": "This meeting covered the resolution of a recent server outage by Priya and a reminder that the next sprint begins on June 22.
    The team discussed the need to improve the onboarding flow for new users and Ravi was assigned to update the user guide.",
    "decisions": [],
    "actionItems": [
        {
            "task": "Update user guide",
            "owner": "Ravi",
            "deadline": "June 21"
        },
        {
            "task": "Improve onboarding flow for new users",
            "owner": null,
            "deadline": null
        }
    ]
}
```

## Setup Note

- After cloning, run ***npm install*** to get dependencies.
- Create a ***.env*** file in the root directory with your Gemini API key (see instructions above).
- The ***.env*** file and ***node_modules/*** are excluded from the repository for security and size reasons.


### Author

- Rithika M Choudhary
- rithikaz2652003@gmail.com
- [My LinkedIn](https://www.linkedin.com/in/rithikachoudhary/)









   
