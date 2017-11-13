import React from 'react';
import { FormControl, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
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
            <Select
              style={{ width: '200px' }}
              options={props.venues}
              value={conf.trim() === '' ? null : { label: conf, value: conf }}
              onChange={value => props.setTrendRowValue(0, index, (value || {}).value || '')}
              placeholder="Search for a conference"
            />
          </td>
          <td>
            <FormControl
              style={{ width: '70px' }}
              type="number"
              value={year}
              min={1}
              max={9999}
              onChange={e => props.setTrendRowValue(1, index, e.target.value)}
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
