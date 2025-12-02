export function AnalyticsCards() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {/* Call Analytics Card */}
      <div className="aspect-video rounded-xl bg-[#171717] p-6 flex flex-col">
        <h3 className="text-base font-semibold mb-1">Call Analytics</h3>
        <p className="text-xs text-zinc-400 mb-3">
          Real-time call volume metrics and agent distribution statistics
        </p>
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* Average Wait Time Column */}
          <div className="flex flex-col">
            <h4 className="text-xs font-medium text-zinc-300 mb-1.5">
              Average Wait Time
            </h4>
            <div className="text-xl font-bold mb-0.5">1m 20s</div>
            <p className="text-xs text-zinc-500">Before call is handled.</p>
          </div>
          {/* Active Calls Column */}
          <div className="flex flex-col">
            <h4 className="text-xs font-medium text-zinc-300 mb-1.5">
              Active Calls
            </h4>
            <div className="flex gap-3">
              {/* Total Sub-column */}
              <div className="flex flex-col">
                <div className="text-2xl font-bold mb-0.5">42</div>
                <p className="text-xs text-zinc-500">Total</p>
              </div>
              {/* AI/Human Sub-column */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className="text-base font-semibold">36</span>
                  <span className="text-xs text-zinc-400">AI</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span className="text-base font-semibold">6</span>
                  <span className="text-xs text-zinc-400">Human</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Resolution Analytics Card */}
      <div className="aspect-video rounded-xl bg-[#171717] p-6 flex flex-col">
        <h3 className="text-base font-semibold mb-1">Resolution Analytics</h3>
        <p className="text-xs text-zinc-400 mb-3">
          Track resolution rates and first-call resolution metrics
        </p>
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* AI Resolution Rate Column */}
          <div className="flex flex-col">
            <h4 className="text-xs font-medium text-zinc-300 mb-1.5">
              AI Resolution Rate
            </h4>
            <div className="flex items-center justify-between mb-1">
              <div className="text-xl font-bold">85%</div>
              <p className="text-xs text-green-500">
                Fully Automated
              </p>
            </div>
            <p className="text-xs text-zinc-500 mb-2">No human intervention.</p>
            {/* Progress Bar */}
            <div className="flex flex-col gap-0.5">
              <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-zinc-500">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          {/* Escalation Rate Column */}
          <div className="flex flex-col">
            <h4 className="text-xs font-medium text-zinc-300 mb-1.5">
              Escalation Rate
            </h4>
            <div className="flex items-center justify-between mb-1">
              <div className="text-xl font-bold">15%</div>
              <p className="text-xs text-orange-500">
                Human Assistance
              </p>
            </div>
            <p className="text-xs text-zinc-500 mb-2">Requires human intervention.</p>
            {/* Progress Bar */}
            <div className="flex flex-col gap-0.5">
              <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "15%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-zinc-500">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sentiment Analytics Card */}
      <div className="aspect-video rounded-xl bg-[#171717] p-6 flex flex-col">
        <h3 className="text-base font-semibold mb-1">Sentiment Analytics</h3>
        <p className="text-xs text-zinc-400 mb-3">
          Monitor customer sentiment trends and satisfaction scores
        </p>
        <div className="flex-1 flex flex-col gap-3">
          {/* Positive Row */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span className="text-xs text-green-500">Positive</span>
              </div>
              <span className="text-xs font-semibold text-green-500">85%</span>
            </div>
            <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
          {/* Neutral Row */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} strokeDasharray="2,2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-xs text-blue-500">Neutral</span>
              </div>
              <span className="text-xs font-semibold text-blue-500">25%</span>
            </div>
            <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>
          {/* Negative Row */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                <span className="text-xs text-red-500">Negative</span>
              </div>
              <span className="text-xs font-semibold text-red-500">10%</span>
            </div>
            <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: "10%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

