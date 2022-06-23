import { checkboxClasses } from '@mui/material';
import { render, screen, fireEvent} from '@testing-library/react';
import { isExists } from 'date-fns';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/22/2022"; 
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});   
  fireEvent.click(element); 
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});   
  fireEvent.click(element);
  const check = screen.getByText(/Test/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/22/2022"; 
  fireEvent.change(inputDate, { target: { value: dueDate}});   
  fireEvent.click(element); 
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.click(element); 
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument(); 
});



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkExists = screen.getByText(/Test/i);
  // const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(checkExists).toBeInTheDocument();
  // expect(checkDate).toBeInTheDocument();
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox); 
  const checkGone = screen.getByText(/You have no todo's left/i);
  expect(checkGone).toBeInTheDocument(); 
});


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const lateDate = "06/22/2000";
  const earlyDate = "06/22/2050";
  fireEvent.change(inputTask, { target: { value: "Late"}});
  fireEvent.change(inputDate, { target: { value: lateDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Early"}});
  fireEvent.change(inputDate, { target: { value: earlyDate}});
  fireEvent.click(element);
  const lateCheck = screen.getByTestId(/Late/i).style.background;
  const earlyCheck = screen.getByTestId(/Early/i).style.background;
  expect(lateCheck).not.toBe(earlyCheck);
});
