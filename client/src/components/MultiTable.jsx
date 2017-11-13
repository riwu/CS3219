import React from 'react';
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import VenueInput from './VenueInput';
import YearInput from './YearInput';
import './MultiTable.css';

const MultiTable = props => (
  <table className="MultiTable">
    <thead>
      <tr>
        <th>Conference</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      {props.compareTrends.conferences.map(([conf, year], index) => (
        <tr key={index}>
          <td>
            <VenueInput
              value={conf.trim() === '' ? null : { label: conf, value: conf }}
              onChange={value => props.setTrendRowValue(0, index, (value || {}).value || '')}
              placeholder="Search for a conference"
            />
          </td>
          <td>
            <YearInput
              value={year}
              onChange={value => props.setTrendRowValue(1, index, value)}
            />
          </td>
          {(index > 0) && (index < props.compareTrends.conferences.length - 1) &&
            <td>
              <OverlayTrigger
                overlay={<Tooltip id="Remove row">Click to remove row</Tooltip>}
              >
                <Glyphicon
                  style={{ cursor: 'pointer', color: 'red' }}
                  glyph="minus-sign"
                  onClick={() => props.removeTrendRow(index)}
                />
              </OverlayTrigger>
            </td>
          }
        </tr>
      ))}
    </tbody>
  </table>
);

export default MultiTable;
