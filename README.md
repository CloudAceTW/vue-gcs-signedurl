# vue-gcs-signedurl

This is the front-end service for [go-gcs-signedurl](https://github.com/CloudAceTW/go-gcs-signedurl), enabling secure file uploads and downloads using Google Cloud Storage (GCS) signed URLs.

## Getting Started
### Prerequisites
- **Backend Service:** Ensure you have the [go-gcs-signedurl](https://github.com/CloudAceTW/go-gcs-signedurl) backend service set up and running.
- **yarn:** Install [yarn](https://yarnpkg.com/) on your system.

### Installation
1. Install Dependencies:
    ```bash
    yarn install
    ```

### Development
- Start Development Server:
  ```bash
  yarn dev
  ```

## Deployment to Production
1. Create a GKE Cluster:
    * Create a Google Kubernetes Engine (GKE) cluster in your Google Cloud project.
2. Configure Helm Chart:
    * Copy the values.yaml.example file to values.yaml:
      ```bash
      cp ./chart/values.yaml.example ./values.yaml
      ```
    * Update the values.yaml file with your project's specific values

3. Build and Push Container Image:
    * Use skaffold to build your container image and push it to Google Artifact Registry (GAR):
      ```bash
      skaffold build -p dev --file-output=artifacts.json -d <GAR_PATH> -t "<TAG>"
      ```
        * Replace <GAR_PATH> with the path to your GAR repository.
        * Replace <TAG> with the desired tag for your container image.
4. Deploy to GKE:
    * Use skaffold to deploy your application to your GKE cluster:
      ```bash
      skaffold deploy -p prod -a artifacts.json
      ```
