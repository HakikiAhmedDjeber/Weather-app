const search = document.getElementById("search");
const searchLoop = document.querySelector(".search-bar i");
const deg = document.getElementById("deg");
const city = document.getElementById("city");
const time = document.getElementById("time");
const icon = document.querySelector("#stat img");
const statDesc = document.querySelector("#stat span");
const citiesList = document.querySelectorAll(".cities li");

// call the Api
let apiResult = null;
search.addEventListener("keypress", (ev) => {
  if (search.value !== "" && ev.key === "Enter") {
    callApi(search.value);
  }
});
searchLoop.addEventListener("click", () => {
  if (search.value !== "") {
    callApi(search.value);
  }
});
function callApi(city) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=99a55af09f3148108e2214129232602&q=${city}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      apiResult = data;
      console.log(apiResult);
      setData();
    })
    .catch((error) => console.error(error));
}
function setData() {
  deg.innerText = apiResult.current.temp_c;
  city.innerText = apiResult.location.name;
  let date = new Date(apiResult.current.last_updated);
  time.innerText = date.toLocaleString("UK");
  icon.src = `http:${apiResult.current.condition.icon}`;
  statDesc.innerText = apiResult.current.condition.text;
  let condition = apiResult.current.condition.text;
  console.log(condition);
  if (condition.includes("cloud"))
    document.body.style.backgroundImage = "url('./images/cloud.jpg')";
  else if (condition.includes("sun") || condition.includes("lear"))
    document.body.style.backgroundImage = "url('./images/sun.jpg')";
  else if (condition.includes("rain"))
    document.body.style.backgroundImage = "url('./images/rain.jpg')";
  else if (condition.includes("now"))
    document.body.style.backgroundImage = "url('./images/snow.jpg')";
}
