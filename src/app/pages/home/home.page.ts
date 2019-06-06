import chartJs from "chart.js";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  @ViewChild("barMonthlyCanvas") barMonthlyCanvas: { nativeElement: any };
  @ViewChild("barWeacklyCanvas") barWeacklyCanvas: { nativeElement: any };
  @ViewChild("perYearlineCanvas") perYearlineCanvas: { nativeElement: any };

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.barMonthlyCanvas.nativeElement = this.getMonthlyBarChart();
      this.barWeacklyCanvas.nativeElement = this.getWeacklyBarChart();
      this.perYearlineCanvas.nativeElement = this.getPerYearLineChart();
    }, 150);
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    });
  }

  getMonthlyBarChart() {
    const data = {
      labels: ["1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Em atraso",
          data: [23],
          backgroundColor: [" #f00"],
          borderWidth: 1
        },
        {
          label: "A receber",
          data: [11],
          backgroundColor: ["#ff0"],
          borderWidth: 1
        },
        {
          label: "Geral",
          data: [13],
          backgroundColor: ["#0f0"],
          borderWidth: 1
        }
      ]
    };
    const options = {
      animation: {
        duration: 1.5
      },
      scales: {
        yAxes: [
          {
            ticks: { beginAtZero: true }
          }
        ]
      }
    };
    return this.getChart(this.barMonthlyCanvas, "bar", data, options);
  }

  getWeacklyBarChart() {
    const data = {
      labels: ["Semana"],
      datasets: [
        {
          label: "Em atraso",
          data: [23],
          backgroundColor: [" #f00"],
          borderWidth: 1
        },
        {
          label: "A receber",
          data: [11],
          backgroundColor: ["#ff0"],
          borderWidth: 1
        },
        {
          label: "Geral",
          data: [13],
          backgroundColor: ["#0f0"],
          borderWidth: 1
        }
      ]
    };
    const options = {
      animation: {
        duration: 1.5
      },
      scales: {
        yAxes: [
          {
            ticks: { beginAtZero: true }
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

  getPerYearLineChart() {
    const data = {
      labels: ["2019"],
      datasets: [
        {
          label: "Janeiro",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#A195D1",
          borderCOlor: "#000",
          borderCapStyle: "butt",
          borderJoinStyle: "miter",
          pointRadius: 1,
          pointHitRadius: 10,
          data: [40],
          scanGaps: false
        },
        {
          label: "Fevereiro",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#A195D1",
          borderCOlor: "#000",
          borderCapStyle: "butt",
          borderJoinStyle: "miter",
          pointRadius: 1,
          pointHitRadius: 10,
          data: [21, 33, 99],
          scanGaps: false
        },
        {
          label: "Março",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#A195D1",
          borderCOlor: "#000",
          borderCapStyle: "butt",
          borderJoinStyle: "miter",
          pointRadius: 1,
          pointHitRadius: 10,
          data: [33],
          scanGaps: false
        },
        {
          label: "Abril",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#A195D1",
          borderCOlor: "#000",
          borderCapStyle: "butt",
          borderJoinStyle: "miter",
          pointRadius: 1,
          pointHitRadius: 10,
          data: [99],
          scanGaps: false
        }
      ]
    };
    return this.getChart(this.perYearlineCanvas, "line", data);
  }
}
