# Campus Food Delivery System

A full stack food ordering and delivery platform built specifically for college campuses, connecting students with campus canteens, mess vendors, and food stalls.

Status: Active
License: MIT

## Table of Contents

* About the Project
* Features
* Tech Stack
* Screenshots and Demo
* System Architecture
* Getting Started
* Environment Variables
* Usage
* Folder Structure
* Future Improvements
* Contributing
* License
* Contact

## About the Project

Campus Food Delivery System is a web and mobile application designed to eliminate long canteen queues and simplify food ordering within college campuses. Students can browse menus from multiple vendors including canteens, mess halls, and food stalls, place orders, track their status in real time, and pay online, all from their phone.

Vendors get a dedicated dashboard to manage their menu, track incoming orders, update availability, and mark orders as prepared or delivered, making campus food service faster and more organized for everyone.

Problem it solves:

* Long wait times during peak canteen hours
* No visibility into order status or estimated wait time
* Manual, paper based order taking for small vendors
* No centralized way to browse what is available across multiple campus food outlets

## Features

### For Students

* Secure login and signup using college email or OTP verification
* Browse menus from multiple campus vendors in one place
* Add to cart and place orders with customization
* Online payment integration
* Real time order tracking through stages such as Placed, Preparing, Ready, and Delivered
* Push and email notifications on order status updates
* Rate and review vendors and food items
* Order history

### For Vendors

* Vendor dashboard to manage menu items and pricing
* Live incoming order queue
* Update order status in real time
* Basic sales and order analytics
* Toggle item or store availability such as open, closed, or out of stock

### For Admin

* Manage registered vendors and users
* Platform wide analytics
* Handle disputes and refunds

## Tech Stack

Update this section with your actual stack. Sample structure below.

Frontend: React.js
Backend: Node.js
Payments: Razorpay
Hosting: Currently Localhost only (NOT LIVE)
Version control: Git and GitHub

## System Architecture

Student App and Vendor App connect to a central Backend API built with Node and Express, which in turn connects to a MongoDB database and integrates with a payment gateway and notification service.

## Getting Started

### Prerequisites

* Node.js version 16 or higher
* VS code or alternatives
* npm
