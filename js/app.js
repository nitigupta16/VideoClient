// replace these values with those generated in your TokBox Account
//var apiKey = "46906374";
//var sessionId = "1_MX40NjkwNjM3NH5-MTU5OTEzNjE5MTIzMn43UUtWejBGN3F6ZFRIelhlVGNmQUo4Ynp-fg";
//var token = "T1==cGFydG5lcl9pZD00NjkwNjM3NCZzaWc9YWU1OWQ2MGYyNzg0M2ZhYTc1YTIxOTcwNGRmZGEwMjY5ZGE2NDdkMDpzZXNzaW9uX2lkPTFfTVg0ME5qa3dOak0zTkg1LU1UVTVPVEV6TmpFNU1USXpNbjQzVVV0V2VqQkdOM0Y2WkZSSWVsaGxWR05tUVVvNFlucC1mZyZjcmVhdGVfdGltZT0xNTk5MTM2MjIwJm5vbmNlPTAuOTc1MDEyNDYyMjM1OTEzMSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk5MTU3ODE5JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9"
// (optional) add server code here
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
  }
});

xhr.open("GET", "http://192.168.1.7:8080/v1/create/session/agentId/ASS123",false);

xhr.send();
var apiKey;
var sessionId;
var token;
function myFunction(arr) {
   apiKey = arr.apiKey;
   console.log(apiKey);
  sessionId = arr.sessionId;
  token =arr.token;
}
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);
      });
  
    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }