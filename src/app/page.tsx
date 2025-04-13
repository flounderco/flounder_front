"use client" // 🧠 This tells Next.js: this page needs to run on the client side (browser).

// 📦 Import React Hooks
import { useState } from "react"

// 🧱 UI Components
import { Card, CardContent } from "@/components/ui/card"

// 🎬 Animation Library
import { motion } from "framer-motion"

// 📈 Chart Components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// ⬆️⬇️ Icons for up/down buttons
import { ChevronUp, ChevronDown } from "lucide-react"

// 🧠 Define possible fixes and their effects
const fixEffects = {
  "fix 1": 0.05,  // +5% effect
  "fix 2": -0.03, // -3% effect
  "fix 3": 0.10,  // +10% effect
}

// 🏠 The main Home page
export default function Home() {
  // 🗃️ State to track which fixes are active
  const [activeFixes, setActiveFixes] = useState<string[]>([])

  // 🗓️ State for number of years shown in the chart
  const [numYears, setNumYears] = useState(4)

  // 📏 State for Y-axis scaling (vertical scaling of the graph)
  const [yScale, setYScale] = useState(100)

  // 🔁 Toggle a fix (add/remove from activeFixes)
  const toggleFix = (fix: string) => {
    setActiveFixes((prev) =>
      prev.includes(fix) ? prev.filter((f) => f !== fix) : [...prev, fix]
    )
  }

  // 🔄 Reset all fixes (clear activeFixes)
  const resetFixes = () => {
    setActiveFixes([])
  }

  // ➕ Sum up the total adjustment from active fixes
  const totalAdjustment = activeFixes.reduce(
    (sum, fix) => sum + (fixEffects[fix as keyof typeof fixEffects] || 0),
    0
  )

  // 📊 Base data without any adjustments
  const baseData = Array.from({ length: numYears }, (_, i) => ({
    year: i + 1,
    value: yScale + i * (80 + numYears * 5),
  }))

  // 📈 Adjusted data based on selected fixes
  const adjustedData = baseData.map((d) => ({
    year: d.year,
    value: d.value * (1 + totalAdjustment),
  }))

  // 🖥️ Return the page layout
  return (
    <motion.main
      className="min-h-screen bg-[#e9e9e9] flex items-center justify-center p-8"
      initial={{ opacity: 0 }}   // 👻 Start hidden
      animate={{ opacity: 1 }}   // 🎥 Fade in
      transition={{ duration: 1 }}
    >
      {/* 🎴 Main card container */}
      <Card className="w-full max-w-6xl bg-[#b2cbd3] shadow-xl rounded-2xl border-0">
        <CardContent className="p-8 relative">

          {/* 🛠️ Fix buttons and Reset button */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
            {/* 🔘 Buttons for each fix */}
            {["fix 1", "fix 2", "fix 3"].map((fix) => (
              <motion.button
                key={fix}
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => toggleFix(fix)}
                className={`w-14 h-7 text-xs font-medium rounded-xl transition-all tracking-wide ${
                  activeFixes.includes(fix)
                    ? "bg-yellow-400 text-black ring-2 ring-yellow-300"  // 🔥 Active button
                    : "bg-[#00546f] text-[#e9e9e9] hover:bg-black hover:text-white" // ⚫ Inactive button
                }`}
              >
                {fix.toUpperCase()}
              </motion.button>
            ))}

            {/* 🔁 Reset button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={resetFixes}
              className="h-7 text-sm px-4 font-semibold rounded-lg bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 border-none transition-all"
            >
              Reset
            </motion.button>
          </div>

          {/* 📈 Chart area */}
          <div className="relative flex justify-center items-center">

            {/* ⬆️⬇️ Y-axis (vertical) zoom buttons */}
            <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              {/* Zoom in Y-axis */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#008db9] hover:bg-yellow-400 text-[#23282a] rounded-full p-2 shadow-md transition-all"
                onClick={() => setYScale((prev) => Math.min(prev + 50, 1000))}
              >
                <ChevronUp className="h-5 w-5" />
              </motion.button>

              {/* Zoom out Y-axis */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#008db9] hover:bg-yellow-400 text-[#23282a] rounded-full p-2 shadow-md transition-all"
                onClick={() => setYScale((prev) => Math.max(prev - 50, 10))}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.button>
            </div>

            {/* ➡️⬅️ X-axis (horizontal) zoom buttons */}
            <div className="absolute bottom-[-40px] flex items-center gap-2">
              {/* More years */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#008db9] hover:bg-yellow-400 text-[#23282a] rounded-full p-2 shadow-md transition-all"
                onClick={() => setNumYears((prev) => Math.min(prev + 1, 15))}
              >
                <ChevronUp className="h-5 w-5" />
              </motion.button>

              {/* Fewer years */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#008db9] hover:bg-yellow-400 text-[#23282a] rounded-full p-2 shadow-md transition-all"
                onClick={() => setNumYears((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.button>
            </div>

            {/* 📊 The actual chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full h-[500px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={adjustedData}
                  style={{ backgroundColor: "#008db9", borderRadius: "12px" }}
                >
                  {/* 🧱 Chart grid */}
                  <CartesianGrid stroke="#ffffff" strokeDasharray="3 3" />

                  {/* 📅 X Axis */}
                  <XAxis
                    type="number"
                    dataKey="year"
                    domain={[1, numYears]}
                    tickCount={numYears}
                    stroke="#d6c2f7"
                    label={{
                      value: "Years",
                      position: "insideBottom",
                      offset: 10,
                      fill: "#d6c2f7",
                    }}
                  />

                  {/* 🔼 Y Axis */}
                  <YAxis
                    type="number"
                    domain={[0, "auto"]}
                    stroke="#d6c2f7"
                    label={{
                      value: "Projection (%)",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#d6c2f7",
                    }}
                  />

                  {/* 🪄 Tooltip on hover */}
                  <Tooltip
                    contentStyle={{ backgroundColor: "#2f0a43", border: "1px solid #6a0dad", color: "#ffffff"}}
                    itemStyle={{ color: "#ffffff" }}
                  />

                  {/* 📈 The line */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ffffff"
                    strokeWidth={3}
                    activeDot={{ r: 8, fill: "#c084fc", stroke: "#c084fc" }}
                    dot={{ r: 4, fill: "#c084fc", stroke: "#c084fc" }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

          </div>

        </CardContent>
      </Card>
    </motion.main>
  )
}
