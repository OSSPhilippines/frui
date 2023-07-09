//types
import type { DateProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';
//helpers
import moment from 'moment';

moment.locale('short', { 
  parentLocale: 'en',
  relativeTime: { 
    future: "-%s",
    past:   "%s",
    s  : 'now',
    ss : 'now',
    m:  "1m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
    w:  "1w",
    ww: "%dw",
    M:  "1M",
    MM: "%dM",
    y:  "1y",
    yy: "%dy"
  }
});

const DateFormat: React.FC<DateProps> = (props) => {
  const { 
    value, 
    locale = 'en',
    format = 'MMMM Do YYYY, h:mm:ss a' 
  } = props;
  const date = new Date(value);
  if (format === 'ago') {
    return (<>{moment(date, format).locale(locale).fromNow()}</>);
  } else if (format === 'a') {
    return (<>{moment(date, format).locale('short').fromNow()}</>);
  }
  return (
    <>{moment(date).locale(locale).format(format)}</>
  );
};

export default DateFormat;