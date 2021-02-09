// the link to your model provided by Teachable Machine export panel
const URL = 'tm-my-image-model/';

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  console.log('init');
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';
  //Hide the start button and show the end button
  start();
  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = false; // whether to flip the webcam
  webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById('webcam-container').appendChild(webcam.canvas);
  labelContainer = document.getElementById('label-container');
}
function start() {
  console.log('start');
  document.querySelector('#start').style.display = 'none';
  document.querySelector('#end').style.display = 'inline-block';
}
function end() {
  document.querySelector('#start').style.display = 'inline-block';
  document.querySelector('#end').style.display = 'none';
  webcam.getTracks().forEach(function (track) {
    track.stop();
  });
}
async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const predictions = await model.predict(webcam.canvas);
  //   console.log(predictions);
  const samples = predictions.map((prediction) => prediction.probability);
  const max_prob = Math.max.apply(null, samples);
  //   console.log(max_prob);
  const matched_digit = predictions.filter(
    (prediction) => prediction.probability === max_prob
  );
  const digit = matched_digit[0].className;
  const accuracy = matched_digit[0].probability.toFixed(2);
  //   console.log(samples);
  labelContainer.innerHTML = `
  <div class="content_window">
    <h2>Recognition Result</h2>
    <h3>Recognized Charactor</h3>
    <div class="big-figure">${digit}</div>
    <h3>Recognition Accuraccy</h3>
    <div class="big-figure">${accuracy}</div>
</div>`;
}
