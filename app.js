(function(){
  const e = React.createElement;

  function App(){
    return e('div', { className:'container' },
      e('div', { className:'bg-x' },
        e('img', { src:'./images/big-x.png', alt:'Yellow X background' })
      ),
      e('div', { className:'content' },
        e('img', { className:'logo', src:'./images/sugar-lockup.png', alt:'Sugar Liquidation Sale' }),
        e('h1', null, 'Coming soon!'),
        e('div', { className:'form-card', style:{ textAlign:'center' } },
          e('button', { id:'openFormBtn', className:'cta', type:'button' }, 'Register Interest')
        )
      )
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(e(App));
})();