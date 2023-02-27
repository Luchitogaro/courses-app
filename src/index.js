import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Layout from './common/Layout/Layout';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path='courses'>
					<Route
						index
						element={
							<Layout>
								<App />
							</Layout>
						}
					/>
					<Route
						path=':courseId'
						element={
							<Layout>
								<CourseInfo />
							</Layout>
						}
					/>
					<Route
						path='add'
						element={
							<Layout>
								<CreateCourse />
							</Layout>
						}
					/>
				</Route>
				<Route
					path='registration'
					element={
						<Layout>
							<Registration />
						</Layout>
					}
				/>
				<Route
					path='login'
					element={
						<Layout>
							<Login />
						</Layout>
					}
				/>
				<Route path='*' element={<Navigate to='login' />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
