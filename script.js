const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');

inputElement.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const command = inputElement.value;
        outputElement.innerHTML += `<div><strong>&gt;&nbsp;${command}</strong></div>`;
        executeCommand(command);
        inputElement.value = '';
    }
});

function executeCommand(command) {
    const response = runCommand(command); // Call a function to process the command
    outputElement.innerHTML += `<div>${response}</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;
}

function runCommand(command) {
    const cmdParts = command.split(' ');
    const cmd = cmdParts[0].toLowerCase();
    const args = cmdParts.slice(1);

    switch (cmd) {
        case 'hello':
            return 'Hello, how can I assist you?';

        case 'date':
            return new Date().toString();

        case 'echo':
            return args.join(' ');

        case 'add':
            const sum = args.reduce((total, arg) => total + parseFloat(arg), 0);
            return `Sum: ${sum}`;

        case 'uppercase':
            return args.join(' ').toUpperCase();

        case 'lowercase':
            return args.join(' ').toLowerCase();

        case 'length':
            return `Length: ${args.join(' ').length}`;

        case 'reverse':
            return args.join(' ').split('').reverse().join('');

        case 'lookup':
            if (args.length !== 1) {
                return 'Usage: lookup [ip]';
            }
            return performIpLookup(args[0]);

            default:
                if (cmd === 'help') {
                    return `
                        Available commands:
                        - hello: Greet the terminal
                        - date: Display the current date and time
                        - echo [text]: Display the provided text
                        - add [numbers]: Add a list of numbers
                        - uppercase [text]: Convert text to uppercase
                        - lowercase [text]: Convert text to lowercase
                        - length [text]: Calculate the length of text
                        - reverse [text]: Reverse the characters of text
                        - lookup [ip]: Sends information about an IP address
                    `;
                }
            return `Unknown command: ${command}`;
    }
}
async function performIpLookup(ip) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();

        if (data.status === 'success') {
            return `
                IP Lookup for ${ip}:
                - ISP: ${data.isp}
                - Organization: ${data.org}
                - Location: ${data.city}, ${data.regionName}, ${data.country}
                - Latitude: ${data.lat}, Longitude: ${data.lon}
            `;
        } else {
            return `IP Lookup failed for ${ip}: ${data.message}`;
        }
    } catch (error) {
        return `Error during IP Lookup: ${error.message}`;
    }
}

// ...

async function executeCommand(command) {
    const response = await runCommand(command); // Use 'await' to handle the Promise
    outputElement.innerHTML += `<div>${response}</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;
}