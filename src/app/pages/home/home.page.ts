import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { CONTEXT } from "@angular/core/src/render3/interfaces/view";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage {
  /*Id do canvas no html */
  @ViewChild("barMonthlyCanvas") barMonthlyCanvas;
  @ViewChild("barWeacklyCanvas") barWeacklyCanvas;
  @ViewChild("lineYearCanvas") lineYearCanvas;

  barMonthlyChart: any;
  barWeacklyChart: any;
  lineYearChart: any;

  constructor() {}

  /*Depois que iniciar a view é jogado para a variavel BarChart no método getBarChart*/
  ngAfterViewInit() {
    setTimeout(() => {
      this.barMonthlyChart = this.getMonthlyBarChart();
      this.barWeacklyChart = this.getWeacklyBarChart();
      this.lineYearChart = this.getYearLineChart();
    }, 150);
  }

  getChart(CONTEXT, chartType, data, options?) {
    return new Chart(CONTEXT, {
      data,
      options,
      type: chartType
    });
  }

  getMonthlyBarChart() {
    const data = {
      labels: ["Red", "Green", "Blue"],
      datasets: [
        {
          label: "# of Votes",
          data: [13, 44, 23],
          backgroundColor: ["#f00", "#0f0", "#00f"],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    return this.getChart(
      this.barMonthlyCanvas.nativeElement,
      "bar",
      data,
      options
    );
  }

  getWeacklyBarChart() {
    const data = {
      labels: ["1", "2", "3"],
      datasets: [
        {
          label: "Label 1",
          data: [11, 54, 12],
          backgroundColor: ["#3f4ed3", "#cccccc", "#4f1245"],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    return this.getChart(
      this.barWeacklyCanvas.nativeElement,
      "bar",
      data,
      options
    );
  }
  getYearLineChart() {
    const data = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      datasets: [
        {
          label: "Junho",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f4ed3",
          borderCapStyle: "butt",
          borderJoinStyle: "miter",
          pointRadius: 1,
          pointHitRadius: 10,
          data: [3000, 4444, 12313, 343, 1231, 62461, 5856, 3433],
          scanGaps: false
        }
      ]
    };
    return this.getChart(this.lineYearCanvas.nativeElement, "line", data);
  }
}
