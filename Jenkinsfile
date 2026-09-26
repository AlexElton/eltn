pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t website:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop website-container || true
                    docker rm website-container || true

                    docker run -d \
                        --name website-container \
                        --restart unless-stopped \
                        -p 8080:3000 \
                        website:latest
                '''
            }
        }
    }
}