```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: When user creates new note, browser will send POST request to server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note [{"content": "New note}]
    activate server
    server-->>browser: Redirect: /notes
    deactivate server

    Note left of server: Server handles the POST request and answers it by URL redirect and browser rerender starts
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "New note, "date": "2024-17-6}]
    deactivate server