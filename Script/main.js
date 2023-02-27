const search = document.getElementById("search");
const searchLoop = document.querySelector(".search-bar i");
const deg = document.getElementById("deg");
const city = document.getElementById("city");
const time = document.getElementById("time");
const icon = document.querySelector("#stat img");
const statDesc = document.querySelector("#stat span");
const citiesList = document.querySelectorAll(".cities li");
const weatherDetails = document.querySelectorAll(".search .details ul span");
let dayOrNight;
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
citiesList.forEach((ele) => {
  ele.addEventListener("click", () => {
    callApi(ele.getAttribute("city"));
    search.value = ele.getAttribute("city");
  });
});
// call the api and get response
function callApi(city) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=99a55af09f3148108e2214129232602&q=${city}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      apiResult = data;
      console.log(apiResult);
      setData();
    })
    .catch((error) => console.error(error));
}
// get the data from api and set it into the page
function setData() {
  deg.innerText = apiResult.current.temp_c;
  city.innerText = apiResult.location.name;
  let date = new Date(apiResult.current.last_updated);
  time.innerText = date.toLocaleString("UK");
  icon.src = `https:${apiResult.current.condition.icon}`;
  statDesc.innerText = apiResult.current.condition.text;
  let condition = apiResult.current.condition.text;
  console.log(condition);
  apiResult.current.is_day === 1
    ? (dayOrNight = "day")
    : (dayOrNight = "night");
  if (condition.includes("cloud"))
    document.body.style.backgroundImage =
      "url('./images/" + dayOrNight + "/cloud.jpg')";
  else if (condition.includes("un") || condition.includes("lear"))
    document.body.style.backgroundImage =
      "url('./images/" + dayOrNight + "/clear.jpg')";
  else if (condition.includes("rain"))
    document.body.style.backgroundImage =
      "url('./images/" + dayOrNight + "/rain.jpg')";
  else if (condition.includes("now"))
    document.body.style.backgroundImage =
      "url('./images/" + dayOrNight + "/snow.jpg')";
  weatherDetails[0].innerText = apiResult.current.cloud + "%";
  weatherDetails[1].innerText = apiResult.current.humidity + "%";
  weatherDetails[2].innerText = apiResult.current.wind_kph + "km/h";
}
