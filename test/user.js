import supertest from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import chaiJsonSchema from "chai-json-schema";
import chai from "chai";
import weatherSchema from "./resources/schema-weather.json" assert { type: "json" };
import airPollutionSchema from "./resources/schema-airpollution.json" assert { type: "json" };
import config from "./resources/config.json" assert { type: "json" };

const request = supertest("http://api.openweathermap.org");

chai.use(chaiJsonSchema);

describe("Weather and Air Pollution of Jakarta Selatan", () => {
  it("Get 5 day weather forecast of Jakarta Selatan", async () => {
    const params = {
      ...config.forecast,
      appid: config.apikey,
    };

    const res = await request.get("/data/2.5/forecast").query(params);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.jsonSchema(weatherSchema);

    res.body.list.forEach((item) => {
      expect(item).to.include.all.keys(
        "dt",
        "main",
        "weather",
        "clouds",
        "wind",
        "visibility",
        "pop",
        "sys",
        "dt_txt"
      );
      expect(item.main).to.include.all.keys(
        "temp",
        "feels_like",
        "temp_min",
        "temp_max",
        "pressure",
        "humidity"
      );
      expect(item.weather[0]).to.include.all.keys(
        "id",
        "main",
        "description",
        "icon"
      );
      expect(item.clouds).to.include.all.keys("all");
      expect(item.wind).to.include.all.keys("speed", "deg");
    });
  });

  it("Get current air pollution of Jakarta Selatan", async () => {
    const params = {
      ...config.airPollution,
      appid: config.apikey,
    };

    const res = await request.get("/data/2.5/air_pollution").query(params);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("list").that.is.an("array").and.is.not.empty;
    expect(res.body).to.be.jsonSchema(airPollutionSchema);
    // console.log(res.body);

    const firstItem = res.body.list[0];
    expect(firstItem).to.include.all.keys("main", "components");
    expect(firstItem.main).to.include.all.keys("aqi");
    expect(firstItem.components).to.include.all.keys(
      "co",
      "no",
      "no2",
      "o3",
      "so2",
      "pm2_5",
      "pm10",
      "nh3"
    );
  });
});
