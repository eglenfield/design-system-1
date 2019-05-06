import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /** Table data. Must be an array of objects */
  data: PropTypes.arrayOf(PropTypes.shape({})),
  /** Array of column specifications */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /** Optional cell data getter method. By default it will grab data at the provided dataKey */
      cellDataGetter: PropTypes.func,
      /** Optional cell renderer method. */
      cellRenderer: PropTypes.func,
      /** Classname to apply to each data cell. Useful for setting explicit column widths */
      className: PropTypes.string,
      /** Unique string key defining this column */
      dataKey: PropTypes.string.isRequired,
      /** Column header text */
      label: PropTypes.node,
      /** Column header text */
      style: PropTypes.shape({}),
    }),
  ).isRequired,
  /** Provides a unique key for each table row. */
  rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Optional additional table className */
  className: PropTypes.string,
  /** Optional additional table inline style */
  style: PropTypes.shape({}),
};

const defaultProps = {
  data: [],
  rowKey: 'id',
  className: '',
  style: {},
};

const defaultColumnDefs = {
  cellDataGetter: ({ dataKey, rowData }) => rowData[dataKey],
  cellRenderer: ({ cellData }) => cellData,
  label: '',
};

const Table = ({ data, columns, rowKey, className, ...rest }) => (
  <table className={classNames('rc-table', className)} {...rest}>
    <thead>
      <tr className="rc-table-header">
        {columns.map(({ label, dataKey, className: cellClassName, style }) => (
          <th
            className={classNames('rc-table-header-cell', cellClassName)}
            key={dataKey}
            style={style}
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((rowData, rowIndex) => (
        <tr
          className="rc-table-row"
          key={typeof rowKey === 'string' ? rowData[rowKey] : rowKey(rowData)}
        >
          {columns.map((column, columnIndex) => {
            const {
              cellDataGetter,
              cellRenderer,
              dataKey,
              className: cellClassName,
              style,
            } = {
              ...defaultColumnDefs,
              ...column,
            };

            return (
              <td
                key={dataKey}
                className={classNames('rc-table-cell', cellClassName)}
                style={style}
              >
                {cellRenderer({
                  cellData: cellDataGetter({
                    dataKey,
                    rowData,
                  }),
                  columnIndex,
                  dataKey,
                  rowData,
                  rowIndex,
                })}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = propTypes;

Table.defaultProps = defaultProps;

export default Table;
