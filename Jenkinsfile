pipeline {
    agent any

    environment {
        IMAGE_NAME = "movie-platform"
        DOCKER_USER = "phambaduong" 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Pham-BaDuong/demo-ci-cd-jenkins.git',
                    credentialsId: 'github-pat'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "=== Building Docker Image ==="
                        docker build -t docker.io/$DOCKER_USER/$IMAGE_NAME:latest .
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push docker.io/$DOCKER_USER/$IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                withCredentials([
                    file(credentialsId: 'docker-compose-file', variable: 'DOCKER_COMPOSE_PATH'),
                    string(credentialsId: 'env-prod', variable: 'ENV_DATA')
                ]) {
                    sh '''
                        echo "=== Starting local deployment ==="
                        mkdir -p ~/project
                        cp $DOCKER_COMPOSE_PATH ~/project/docker-compose.yml
                        cd ~/project
                        echo "$ENV_DATA" > .env
                        docker compose --env-file .env pull
                        docker compose --env-file .env down
                        docker compose --env-file .env up -d
                        docker image prune -f
                    '''
                }
            }
        }
    }
}
