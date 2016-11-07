const App = React.createClass({
  getInitialState: function() {
    return {
      base: 'USD',
      symbol: null,
      currencies: null,
      rate: null
    }
  },

  componentDidMount: function() {
    let that = this;
    fetch('http://api.fixer.io/latest?base=USD',{
      method: 'get'
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
     that.setState({currencies : Object.keys(json.rates)})
     console.log(that.state.currencies);
    }).catch(function(err) {
      alert('There was an erro fetching the currencies')
    })
  },

  setSymbol(e) {
    let symbol = e.target.value;
    console.log(symbol);
    this.setState({symbol: symbol})
  },

  getExchange(e) {
    let that = this;
    fetch('http://api.fixer.io/latest?base=USD&symbols=' + this.state.symbol,{
      method: 'get'
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      let s = Object.keys(json.rates)[0];
      console.log(s);
      let rate = json.rates[s];
      console.log(rate)
      that.setState({rate: rate})
      console.log(that.state.rate);
    }).catch(function(err) {
      console.log(err);
      alert('There was an erro fetching the currencies')
    })

  },

  render: function() {
    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <p>CONVER ANY CURRENCY TO USD</p>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {this.state.currencies ?
              <select style={{marginTop: '20px'}} onChange={this.setSymbol}>
                <option value=''>Please choose a value</option>
                {this.state.currencies.map(currency =>
                  {
                 return <option value={currency}>{currency}</option>
                })}
              </select>
             :
              <p>loading...</p>}
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <button style={{marginTop: '20px', marginBottom: '20px'}} type="button" className="btn btn-success" onClick={this.getExchange}>CONVERT</button>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
           {this.state.rate ?
            <p>The {this.state.symbol} is exchanging at {this.state.rate} to the USD</p>
            :
            <p>No conversion made yet</p>}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('content'))

