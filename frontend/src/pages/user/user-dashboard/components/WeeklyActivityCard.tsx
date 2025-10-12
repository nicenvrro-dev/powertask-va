import { motion } from "framer-motion";
import { useMemo } from "react";

export default function WeeklyActivityCard() {
  const activityData = useMemo(
    () => [
      { day: "Oct 3", value: 0 },
      { day: "Oct 4", value: 0 },
      { day: "Oct 5", value: 0 },
      { day: "Oct 6", value: 0 },
      { day: "Oct 7", value: 0 },
      { day: "Oct 8", value: 0 },
      { day: "Oct 9", value: 2 },
    ],
    []
  );

  const maxValue = Math.max(...activityData.map((d) => d.value), 1);
  const todaysActivities = activityData[activityData.length - 1].value;

  const points = useMemo(() => {
    return activityData
      .map((d, i) => {
        const x = (i / (activityData.length - 1)) * 100;
        const y = 100 - (d.value / maxValue) * 100;
        return `${x},${y}`;
      })
      .join(" ");
  }, [activityData, maxValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden h-full"
    >
      <div className="bg-gradient-to-br from-[#5c72e0] to-[#6952ad] p-6">
        <h2 className="text-2xl font-bold text-white">Weekly Activity</h2>
      </div>

      <div className="p-6">
        <div className="relative h-48 mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <motion.polyline
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              points={points}
            />

            <motion.polygon
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              fill="url(#areaGradient)"
              points={`0,100 ${points} 100,100`}
            />

            {activityData.map((d, i) => {
              const x = (i / (activityData.length - 1)) * 100;
              const y = 100 - (d.value / maxValue) * 100;
              return (
                <motion.circle
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#6366f1"
                  className="drop-shadow-lg"
                />
              );
            })}
          </svg>

          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 mt-2">
            {activityData.map((d, i) => (
              <div key={i} className="text-center">
                {d.day.split(" ")[1]}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-6 border-t border-gray-100">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
            className="text-5xl font-bold text-indigo-600 mb-2"
          >
            {todaysActivities}
          </motion.div>
          <div className="text-gray-500 font-medium">Today's Activities</div>
        </div>
      </div>
    </motion.div>
  );
}
