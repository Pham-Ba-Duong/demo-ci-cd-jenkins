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
                    url: 'https://github.com/Pham-Ba-Duong/demo-ci-cd-jenkins.git',
                    credentialsId: 'github-pat'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "=== Building Docker Image ==="
                        docker build -t $DOCKER_USER/$IMAGE_NAME:latest .
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_USER/$IMAGE_NAME:latest
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
                        # Tạo thư mục project nếu chưa có
                        mkdir -p ~/project
                        
                        # Copy file docker-compose.prod.yml từ Jenkins Credential
                        cp $DOCKER_COMPOSE_PATH ~/project/docker-compose.yml
                        cd ~/project
                        
                        # Tạo file .env từ Credential
                        echo "$ENV_DATA" > .env
                        
                        # Pull image mới
                        docker compose --env-file .env pull
                        
                        # Dừng container cũ nếu có
                        docker compose --env-file .env down
                        
                        # Chạy container mới
                        docker compose --env-file .env up -d
                        
                        # Dọn dẹp các image cũ
                        docker image prune -f
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "=== Pipeline finished ==="
        }
        success {
            echo "✅ Deployment succeeded!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
