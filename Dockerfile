FROM node:10.15.3

LABEL AUTHOR="Thomas DSilva (thomas.dsilva@ttcglobal.com)"
COPY ./ ./
RUN mkdir /downloads
RUN npm install
#EXPOSE 3000

#CMD ["npm", "run", "test"]