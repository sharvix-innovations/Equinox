import CountUp from 'react-countup'

// Animated number that counts up when scrolled into view.
export default function StatCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  duration = 2.2,
}) {
  return (
    <CountUp
      end={value}
      duration={duration}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      enableScrollSpy
      scrollSpyOnce
      className={className}
    />
  )
}
