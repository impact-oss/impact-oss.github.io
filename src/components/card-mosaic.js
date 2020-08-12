import React, { useState, useEffect } from "react"
import Card from "./card"
import csvtojson from "csvtojson"
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Label,
} from "recharts"
import { Link } from "gatsby"

const CardMosaic = ({ search }) => {
  const [cards, setCards] = useState([])
  const [state, setState] = useState({ population: 1 })

  useEffect(() => {
    const searchParams = new URLSearchParams(search.split("?")[1])
    const region = searchParams.get("region")
    const subregion = searchParams.get("subregion")
    const filename = searchParams.get("filename")
    const population = searchParams.get("population")
    const employed_percent = searchParams.get("employed_percent")

    setState(s => ({ ...s, population, region, subregion, employed_percent }))
    fetch(`/impact-data/${region}/${filename}`)
      .then(response => response.text())
      .then(csv => csvtojson().fromString(csv))
      .then(json => setCards(json))
  }, [search])

  useEffect(() => {
    let total = 0
    setState(s => ({
      ...s,
      series: cards.map((card, i) => ({
        total_layoffs:
          card.layoffs >= 0 ? (total += parseInt(card.layoffs, 10)) : 0,
        layoffs: card.layoffs >= 0 ? parseInt(card.layoffs, 10) : 0,
        company_name: card.name,
        name: i,
      })),
    }))
  }, [cards])

  return (
    <div
      style={{
        padding: "1em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Link to={`/`}>Home</Link>
        {" > " + state.region + " > " + state.subregion}
      </div>
      {state.series && (
        <LineChart
          width={730}
          height={400}
          data={state.series}
          margin={{ top: 15, right: 30, left: 40, bottom: 20 }}
        >
          <XAxis dataKey="name">
            <Label
              value="Impacted companies"
              offset={-15}
              position="insideBottom"
            />
          </XAxis>
          <YAxis>
            <Label
              value={"Number of layoffs"}
              angle={-90}
              position={"insideLeft"}
              offset={-30}
            />
          </YAxis>
          <Tooltip key={"layoffs"} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line
            type="monotone"
            dataKey="total_layoffs"
            stroke="#ff7300"
            yAxisId={0}
          />
        </LineChart>
      )}
      <div
        style={{
          padding: "1em",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {cards.map(card => (
          <Card key={card.name} {...card} {...state} />
        ))}
      </div>
    </div>
  )
}

export default CardMosaic
