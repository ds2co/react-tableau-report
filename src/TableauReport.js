import React, { PropTypes, Component } from 'react';
import url from 'url';
import { shallowequal } from './utils';
import Tableau from './tableau-api';

const propTypes = {
  filters: PropTypes.object,
  url: PropTypes.string,
  parameters: PropTypes.object,
  options: PropTypes.object,
  token: PropTypes.string
};

const defaultProps = {
  loading: false,
  parameters: {},
  filters: {},
  options: {}
};

/**
 * React Component to render reports created in Tableau.
 *  
 * @class TableauReport
 * @extends {Component}
 */
class TableauReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters,
      parameters: props.parameters,
      currentUrl: props.url
    };
  }

  componentDidMount() {
    this.initTableau();
  }

  componentWillReceiveProps(nextProps) {
    const isReportChanged = nextProps.url !== this.state.currentUrl;
    const isFiltersChanged = !shallowequal(this.props.filters, nextProps.filters);
    const isParametersChanged = !shallowequal(this.props.parameters, nextProps.parameters);
    const isLoading = this.state.loading;

    if (isReportChanged) {
      this.state.currentUrl = nextProps.url;
      this.forceUpdate();
      this.initTableau();
    }

    if (!isReportChanged && isFiltersChanged && !isLoading) {
      this.applyFilters(nextProps.filters);
    }

    if (!isReportChanged && isParametersChanged && !isLoading) {
      this.applyParameters(nextProps.parameters);
    }
  }


  /**
   * Gets the url for the tableau report.
   * 
   * @returns {String} A constructed url. 
   * @memberOf TableauReport
   */
  getUrl() {
    const parsed = url.parse(this.props.url, true);

    let result = parsed.protocol + '//' + parsed.host;
    if (this.props.token) result += '/trusted/' + this.props.token;
    result += parsed.pathname + '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes';

    return result;
  }

  /**
   * Asynchronously applies filters to the worksheet, excluding those that have
   * already been applied, which is determined by checking against state.
   * @param  {Object} filters
   * @return {void}
   * @memberOf TableauReport
   */
  applyFilters(filters) {
    const REPLACE = Tableau.FilterUpdateType.REPLACE;
    const promises = [];

    this.setState({ loading: true });

    for (const key in filters) {
      if (
        !this.state.filters.hasOwnProperty(key) ||
        !shallowequal(this.state.filters[key], filters[key])
      ) {
        promises.push(
          this.sheet.applyFilterAsync(key, filters[key], REPLACE)
        );
      }
    }

    Promise.all(promises).then(() => { this.setState({ loading: false, filters }) });
  }

  /**
   * Asynchronously applies parameters to the worksheet, excluding those that have
   * already been applied, which is determined by checking against state.
   * @param  {Object} parameters
   * @return {void}
   * @memberOf TableauReport
   */
  applyParameters(parameters) {
    const promises = [];

    for (const key in parameters) {
      if (
        !this.state.parameters.hasOwnProperty(key) ||
        this.state.parameters[key] !== parameters[key]
      ) {
        const val = parameters[key];
        promises.push(this.workbook.changeParameterValueAsync(key, val));
      }
    }

    Promise.all(promises).then(() => this.setState({ loading: false, parameters }));
  }

  /**
   * Initialize the viz via the Tableau JS API.
   * @return {void}
   * @memberOf TableauReport
   */
  initTableau() {
    const vizUrl = this.getUrl();

    const options = {
      ...this.props.filters,
      ...this.props.parameters,
      ...this.props.options,
      onFirstInteractive: () => {
        this.workbook = this.viz.getWorkbook();
        this.sheets = this.workbook.getActiveSheet().getWorksheets();
        this.sheet = this.sheets[0];
      }
    };

    if (this.viz) {
      this.viz.dispose();
      this.viz = null;
    }

    this.viz = new Tableau.Viz(this.container, vizUrl, options);
  }

  render() {
    return <div ref={c => this.container = c} />;
  }
}

TableauReport.propTypes = propTypes;
TableauReport.defaultProps = defaultProps;

export default TableauReport;
