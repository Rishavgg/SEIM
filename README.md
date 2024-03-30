<h1 align="center">SEIM</h1> 

![GitHub repo size](https://img.shields.io/github/repo-size/snowkluster/SEIM)  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


SEIM is a custom log monitoring and filtering solution that is built using Docker, It allows visualizing data from multiple sources and generate PDF reports to be shared. It is based on my research done on SIEM platforms like wazuh and Splunk. It can also connect to different AI models to detect threats in real time.

#### Note
This repository only contains the architecture and the analysis code for the platform, not the code related to AI model. The model and its functionality are exposed using an API endpoint.

## Deployment

To deploy this project run

```bash
  bash setup.sh
```
OR

```sh
chmod +X setup.sh \
./setup.sh
```

<h2 id="scenario1"> :small_blue_diamond: Docker Compose OverView</h2>
<img alt="compose.yml" src="images/Compose.yml.png" />

<h2 id="scenario1"> :small_blue_diamond: User Data Workflow</h2>

<img alt="workflow" src="images/workflow.png" />



## Authors

- [@snowkluster](https://github.com/snowkluster) 

