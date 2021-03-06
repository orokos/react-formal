import React from 'react';

/**
 * `<Form.Context />` provides declarative API similar in purpose to the
 * HTML5 `.form` attribute. Sometimes it is necessary to trigger a form
 * validation or submission from _outside_ a `<Form />`. To do this you
 * can use the imperative API of capturing the `<Form />` instance in a ref
 * and calling the `.submit()` method on it, but this can be troublesome with
 * Higher order Components, used by your app or other libraries. An easier
 * approach is to use `<Form.Context />` to wrap both your form and trigger.
 *
 * ```js
 * <Form.Context>
 *   <MyForm />
 *
 *   <Form.Submit />
 * </Form.Context>
 * ```
 *
 * @alias Context
 */
class FormContext extends React.Component {
  /**
   * the component the Context will render as it's root if necessary.
   * If there is only one child defined the Context will just return that.
   *
   * @default 'div'
  **/
  static propTypes = {
    component: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.string
    ])
  }

  static childContextTypes = {
    reactFormalContext: React.PropTypes.object
  }

  getChildContext(){
    return this._context || (this._context = {
      reactFormalContext: {
        submit: (fn) => this.submit = fn,
        onSubmit: ()=> {
          (this.submit || (()=>{}))();
        }
      }
    })
  }

  render(){
    let Tag = this.props.component || 'div';
    return React.Children.count(this.props.children) === 1
      ? this.props.children
      : <Tag {...this.props}/>
  }
}

export default FormContext;
