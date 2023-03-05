## Inspiration 💡 
Upcycle was inspired by the challenges faced by the global fashion market and economy, which led to increased textile pollution and job layoffs in the tailoring and seamstress industries during the COVID pandemic. We saw an opportunity to tackle textile pollution and promote sustainability while creating new job opportunities for tailors and seamstresses. Our mission is to revolutionize the fashion industry through upcycling and machine learning, using analytics to create a more sustainable and economically stable future. By reducing waste and promoting upcycling, we aim to make a positive impact on the global economy while promoting environmental and social responsibility.

![TOP](https://user-images.githubusercontent.com/48355572/222961057-a2bafc88-1880-41b1-8116-6efa24ffcf3c.png)

As someone who deeply cares about sustainability, I believe that we must take action now to preserve our planet for future generations. We need to shift our focus towards creating a circular economy, where waste is minimized and resources are reused. This is particularly important in the fashion industry, which is responsible for a significant amount of pollution and waste. By promoting sustainable practices such as upcycling and reducing textile waste, we can not only help the environment, but also create new job opportunities and boost the global economy. It's time to rethink the way we consume and produce goods, and work towards a more sustainable future.

## What it does 🤔 
Upcycle is a smart webapp designed to connect users with their local tailors and seamstresses to extend the lifespan of their clothes. The app's goal is to support the local tailoring industry while keeping users on-trend. Studies estimate that more than $500 billion in value is lost annually due to underutilized clothing and lack of recycling? Unfortunately, less than 50% of returned items from online shopping go back on sale, leading retailers to send them to incinerators or landfills. To reduce waste, we need to recycle and reuse clothes more.

Although similar reselling apps already exist and are successful, but mending clothes is still unpopular because it's more convenient to replace them. That's where Upcycle comes in. We aim to connect users with local tailors and seamstresses who can meet their clothing repair and upcycling needs, ultimately reducing waste and supporting the desire to remain on-trend. The app can also provide a platform for homemakers with a sewing machine, seamstresses who work from home, or fashion students who need extra cash.

![image](https://user-images.githubusercontent.com/48355572/222971597-9f49deac-8945-447d-8737-42edeb4c7f52.png)

#### UX Flow:

- Sign-in / Sign-up with Google (OAuth) — Users can sign-up normally but Tailors/Seamstresses etc. have to fill-up a form to register themselves. (This is done to prevent spam)
- Once logged in, user will be redirected to main dashboard to explore tailors in their proximity.
- Users can choose the one that suits their needs and preferences.
- Users can also filter by a specific service and view the tailor's location, star rating, and services offered.
- Users can easily message the tailor, upload images, and specify the exact service they want.
- Users and tailors can mutually decide a time slot that works for both to collect and deliver the goods.
- Users can also generate custom clothing for themselves leveraging our bleeding-edge Stable Diffusion model.
- Moreover, we also provide "3D Reconstruction of Humans Wearing Clothing" (Easter Egg!) for a limited period.
- Users can view their current orders on their profile page and follow tailors they like. On successful completion of orders, Tailors can get reviews, earn points and gain followers on the app.
- In the future, Upcycle plans to implement a delivery-style courier system using local cyclists or riders.

![image](https://user-images.githubusercontent.com/48355572/222973422-2b5cf668-2474-4eed-adc7-2eae8ec2eaae.png)

## How we built it ⚙️
First and foremost, it is Crafted with 💙. We have built a ML-enabled full-stack application that solves a real world problem. The whole process can be broken into the following points :-

* Front-end: TypeScript, Next.js with Tailwind CSS and DaisyUI
* Middleware & Backend: Express, Prisma Client, Firebase, Google Cloud API & MongoDB.
* ML Stack: Tensorflow, Keras, Flask, Python, Stable Diffusion, Text2Img 

## Design 🎨
We were heavily inspired by the revised version of **Double-Diamond** design process, which not only includes visual design, but a full-fledged research cycle in which you must discover and define your problem before tackling your solution & then finally deploy it.

![Double Diamond](https://user-images.githubusercontent.com/48355572/222963483-a7b27bd8-6223-4d6a-b56d-c3570ab5f92e.png)

> 1. **Discover**: a deep dive into the problem we are trying to solve.
> 2. **Define**: synthesizing the information from the discovery phase into a problem definition.
> 3. **Develop**: think up solutions to the problem.
> 4. **Deliver**: pick the best solution and build that.

Moreover, we utilized design tools like Figma,  Photoshop & Illustrator to prototype our designs before doing any coding. Through this, we are able to get iterative feedback so that we spend less time re-writing code.

![image](https://user-images.githubusercontent.com/48355572/222972245-5acfdd99-0063-49f1-abe7-a2032d4dee7e.png)

![breaker](https://user-images.githubusercontent.com/48355572/214252830-b5c764db-25c2-451a-b74c-876423f81917.png)

# Research 📚
Research is the key to empathizing with users: we found our specific user group early and that paves the way for our whole project. Here are a few of the resources that were helpful to us —

- [Size of the Global Fashion Retail Market](https://www.commonobjective.co/article/the-size-of-the-global-fashion-retail-market#:~:text=The%20global%20retail%20fashion%20market,fifth%20largest%20market%20for%20fashion.)
- [Can Fast Fashion Ever Be Sustainable?](https://www.practicalecommerce.com/can-fast-fashion-ever-be-sustainable)
- [The Myth of Sustainable Fashion, Harvard Business Review](https://hbr.org/2022/01/the-myth-of-sustainable-fashion)
- [Sustainability and Circularity in Fast Fashion - Myth or Reality?](https://www.fibre2fashion.com/industry-article/9573/sustainability-and-circularity-in-fast-fashion-myth-or-reality)
- [Fashion Industry Environmental Impact (Bloomberg)](https://www.bloomberg.com/graphics/2022-fashion-industry-environmental-impact)
- [Why Fashion Needs to Be More Sustainable?](https://news.climate.columbia.edu/2021/06/10/why-fashion-needs-to-be-more-sustainable)
- [Textile industry is responsible for as much as 20 percent of industrial pollution in our rivers and land](https://www.academia.edu/28284605/ECONOMIC_SUSTAINABILITY_IN_TERMS_OF_ENVIRONMENTALISM_AND_ECONOMIC_RESPONSIBILITY_IN_TEXTILE_INDUSTRY)
- [The Economic, Social and Environmental Impacts of “Fast Fashion”](https://www.wri.org/insights/numbers-economic-social-and-environmental-impacts-fast-fashion)
- [Can fashion ever be sustainable? (BBC)](https://www.bbc.com/future/article/20200310-sustainable-fashion-how-to-buy-clothes-good-for-the-climate)
- [FashGen](https://arxiv.org/pdf/1806.08317v2.pdf)
- [VITON-HD: High-Resolution Virtual Try-On
via Misalignment-Aware Normalization](https://arxiv.org/pdf/2103.16874v2.pdf)
- [Toward Characteristic-Preserving Image-based
Virtual Try-On Network](https://arxiv.org/pdf/1807.07688v3.pdf)
- [Cloth Interactive Transformer for Virtual Try-On](https://arxiv.org/pdf/2104.05519v1.pdf)
- [M3D-VTON](https://arxiv.org/pdf/2108.05126v1.pdf)
- [Photorealistic Monocular 3D Reconstruction of Humans Wearing Clothing](https://phorhum.github.io)
- [FashionMNIST API Docs](https://keras.io/api/datasets/fashion_mnist)
- [Prisma ORM docs](https://www.prisma.io/docs)


**Resources stacked up for future** ⚡
- [DreamFusion: Text-to-3D using 2D Diffusion](https://arxiv.org/pdf/2209.14988v1.pdf)
- [InstructPix2Pix](https://arxiv.org/pdf/2211.09800v2.pdf)
- [Deep Fashion3D](https://arxiv.org/pdf/2003.12753v2.pdf)

![image](https://user-images.githubusercontent.com/48355572/222962973-992e0a8c-4347-44c0-a630-d0f9dd0fddf6.png)

**CREDITS**
- **Design Resources** : Freepik
- **Icons** : Icons8, fontawesome
- **Font** : Roboto / Orbitron / Raleway / Righteous

---

## Challenges we ran into 😤
We faced some challenges during the hackathon, many of which ironically related to working remotely. One of the major challenges was the time difference. All of us participated from different time zones, which created communication challenges.

## Accomplishments that we're proud of ✨
We are proud of finishing the project on time which seemed like a tough task as we started working on it quite late due to other commitments. We were also able to add most of the features that we envisioned for the app during ideation. And as always, working overnight was pretty fun! :)

This project was a notable accomplishment for us because it presented a unique experience compared to the typical hybrid hackathons. We engaged in thorough brainstorming and extensive research, which culminated in a satisfying sense of accomplishment upon successfully completing the project.

## What we learned 🙌
**Proper sleep is very important! :p** Well, a lot of things, both summed up in technical & non-technical sides. Also not to mention, we enhanced our googling and Stackoverflow searching skill during the hackathon :)

![Team](https://user-images.githubusercontent.com/48355572/222960557-ce7d5fb3-ad83-452a-8c4e-1eb033acb02c.png)

Our team of four is committed to empowering sustainable fashion through upcycling, with a mission to reduce waste and promote clothing reuse. Through our utilization of machine learning and focus on social good, we aim to create a significant impact on the fashion industry and global sustainability. We are dedicated to empowering customers, tailors, and seamstresses to join this movement towards reducing pollution and building a more sustainable future. Our commitment to analyzing products and promoting upcycling is just the beginning of our efforts to create a positive impact on the world.

## What's next for Upcycle 🚀
Upcycle's future plans include expanding its reach to a larger audience by partnering with fashion retailers and promoting sustainable fashion. The team also aims to further improve the machine learning algorithms to provide more accurate analysis and recommendations for upcycling. In addition, they plan to collaborate with tailors and seamstresses to create upcycled fashion products and promote their work. Upcycle also intends to raise awareness about the importance of reducing clothing waste and promoting sustainability in the fashion industry by organizing events and campaigns. Ultimately, Upcycle aims to revolutionize the clothing industry by creating a more sustainable and socially responsible future.

#### License — [MIT](https://github.com/Neilblaze/upcycle/blob/main/LICENSE)

**Note ⚠️ — API credentials have been revoked. If you want to run the same on your local, use your own credentials.**

![FLOOR](https://user-images.githubusercontent.com/48355572/222961597-a4469548-be1d-4126-9ea6-01dfbf8b3b7b.png)
