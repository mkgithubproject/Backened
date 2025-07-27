###  introduction:


---

👋 Hi, my name is **Mohit Kumar**. I’m from **Bareilly, Uttar Pradesh**.
I have done  my 12th in **2016** with **79% marks**, and I did my **B.E. from **Chandigarh University** in **2020**, with a 
**7.1 CGPA**.

I’m a **Node js backend developer** with **2.6 years of experience** in building strong and scalable systems using **Node.js**, **Express**, and **MongoDB**.

I’ve worked on:

* **e-commerce platforms app called buyume.**
* Custom **CRM systems**\
* **Logistics and finance integrations**\
  like Shiprocket and Rocketbox for shipping and tracking, Uniware for managing warehouse operations, and Zoho Books for creating invoices,        credit notes, and sales orders automatically.
* **ONDC service provider models**\
  I worked on the backend system for the ONDC service provider model, where I handled things like adding new sellers, syncing their product catalogs, and managing the full order process as per ONDC rules.

I’m good at designing REST APIs, improving performance, and working with tools like Redis, RabbitMQ, Docker, and AWS (like EC2, S3, and Route53). I used Nginx to deploy backend apps.

Before this, I worked as a **Subject Matter Expert** at **Course Hero** and **Chegg**, where I helped students in writing, testing, and debugging Java code, helping them understand topics like classes, inheritance, polymorphism, arrays, linked lists, and sorting/searching algorithms.


---

### project explaination
1. ONDC service provider models: (Open Network for Digital Commerce.),
   so what is ondc service provider models is, so there two nodes in the network
   1. buyer app (Network node for the consumer)
       A buyer uses the buyer app to book services (for example paytm, hamaramall,)
   2. seller app (Network node for the service provider)
       A seller uses the app to show prices , discount, and availability for different services.
      
   ## Sequence for Booking Home Service:
     1. Service Discovery\
        /search (Search intent sent by the buyer based on the service requirement, so buyer app will hit my server /search api
        and on that requirement i will call the api /on_search on the bahald of /search on same transaction id.)
        
        /on_search (**/on_search** - Seller Returns the catalog specific to the search intent + available schedule)
        
     3. Order Placement\
       **/select** - Buyer adds the service to cart and selects the schedule for Home Service\
        **/on_select** - Seller confirms the schedule and returns the quote\
        **/init** - Buyer initialises the order and provides billing details\
        **/on_init** - Seller provides the final quotation and creates the draft contract\
        **/confirm** - Buyer makes the payment and creates the order\
        **/on_confirm** - Seller accepts the order\
     2. Order Fulfillment\
        **/status** - Buyer requests for a status\
        **/on_status** - Seller app sends order status update when service provider is on the way or reached at destination/ service started/ completed and all, We also added an OTP-based confirmation system for service completion. When the service ends, we generate an OTP and send it to the buyer app through the on_status API. The buyer app  shares the OTP with the customer. The service professional verifies this OTP to confirm that the service was completed properly and honestly and This also helps the service provider ensure the service was delivered ethically.



### project 2 , b2b order creation module.
        
        
      
      
   





