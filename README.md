# Table of Contents
* [Description](https://github.com/krisclarkdev/tok8sevents#tok8sevents)
* [How to build](https://github.com/krisclarkdev/tok8sevents#how-to-build-the-image)
* [Usage](https://github.com/krisclarkdev/tok8sevents#usage)
* [License](https://github.com/krisclarkdev/tok8sevents/blob/master/LICENSE.md)

# tok8sevents
tok8sevents is an example container showing how you can send in events to Wavefront when performing various actions in helm such as

* Install
* Delete
* Upgrade
* Rollback

![alt text](output.png)

# How to build the image

```shell
git clone https://github.com/krisclarkdev/tok8sevents.git
cd tok8sevents
vi Dockerfile
# Uncomment either line 1 or line 2 depending on your CPU architecture
docker build -t krisclarkdev/tok8sevents:amd64 .
# or
docker build -t krisclarkdev/tok8sevents:arm64v8 .
```

# Usage
* Copy chart/templates/wavefrontevents.yaml to your Helm chart directory.
* Before deploying your Helm chart, create a `wavefront-proxy` Kubernetes secret in the namespace you are deploying your chart to.
  * `k create secret generic wavefront-token --from-literal=url=https://surf.wavefront.com --from-literal=token=b5a5c649-1a97-4653-a574-89139e27ce6b`
* Deploy your Helm chart.
* View the event under browse>events in Wavefront

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pre-install-hook-pod
  annotations:
    "helm.sh/hook": pre-install
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  serviceAccountName: internal-kubectl
  containers:
  - name: wfeventcreator
    image: krisclarkdev/tok8sevents
    env:
    - name: URL
      value: "https://CHANGEME.wavefront.com"
    - name: TOKEN
      value: "CHANGEME"
    - name: CHARTNAME
      value: "{{ .Chart.Name }}"
    - name: CHARTVERSION
      value: "{{ .Chart.Version }}"
    - name: EVENTNAME
      value: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    - name: SEVERITY
      value: "info"
    - name: DETAILS
      value: "This was generated from a Helm action"
    - name: TAGS
      value: "helm,k8s,install,{{ .Release.Name }},{{ .Chart.Name }}"
    - name: CREATEEVENT
      value: "1"
    imagePullPolicy: Always
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
---
apiVersion: v1
kind: Pod
metadata:
  name: pre-delete-hook-pod
  annotations:
    "helm.sh/hook": pre-delete
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  serviceAccountName: internal-kubectl
  containers:
  - name: wfeventcreator
    image: krisclarkdev/tok8sevents:arm64v8
    env:
    - name: URL
      value: "https://CHANGEME.wavefront.com"
    - name: TOKEN
      value: "CHANGEME"
    - name: CHARTNAME
      value: "{{ .Chart.Name }}"
    - name: CHARTVERSION
      value: "{{ .Chart.Version }}"
    - name: EVENTNAME
      value: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    - name: SEVERITY
      value: "info"
    - name: DETAILS
      value: "This was generated from a Helm action"
    - name: TAGS
      value: "helm,k8s,delete,{{ .Release.Name }},{{ .Chart.Name }}"
    - name: CREATEEVENT
      value: "1"
    imagePullPolicy: Always
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
---
apiVersion: v1
kind: Pod
metadata:
  name: pre-upgrade-hook-pod
  annotations:
    "helm.sh/hook": pre-upgrade
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  serviceAccountName: internal-kubectl
  containers:
  - name: wfeventcreator
    image: krisclarkdev/tok8sevents:arm64v8
    env:
    - name: URL
      value: "https://CHANGEME.wavefront.com"
    - name: TOKEN
      value: "CHANGEME"
    - name: CHARTNAME
      value: "{{ .Chart.Name }}"
    - name: CHARTVERSION
      value: "{{ .Chart.Version }}"
    - name: EVENTNAME
      value: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    - name: SEVERITY
      value: "info"
    - name: DETAILS
      value: "This was generated from a Helm action"
    - name: TAGS
      value: "helm,k8s,upgrade,{{ .Release.Name }},{{ .Chart.Name }}"
    - name: CREATEEVENT
      value: "1"
    imagePullPolicy: Always
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
---
apiVersion: v1
kind: Pod
metadata:
  name: pre-rollback-hook-pod
  annotations:
    "helm.sh/hook": pre-rollback
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  serviceAccountName: internal-kubectl
  containers:
  - name: wfeventcreator
    image: krisclarkdev/tok8sevents:arm64v8
    env:
    - name: URL
      value: "https://CHANGEME.wavefront.com"
    - name: TOKEN
      value: "CHANGEME"
    - name: CHARTNAME
      value: "{{ .Chart.Name }}"
    - name: CHARTVERSION
      value: "{{ .Chart.Version }}"
    - name: EVENTNAME
      value: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    - name: SEVERITY
      value: "info"
    - name: DETAILS
      value: "This was generated from a Helm action"
    - name: TAGS
      value: "helm,k8s,rollback,{{ .Release.Name }},{{ .Chart.Name }}"
    - name: CREATEEVENT
      value: "1"
    imagePullPolicy: Always
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
---
apiVersion: v1
kind: Pod
metadata:
  name: post-install-hook-pod
  annotations:
    "helm.sh/hook": post-install
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  serviceAccountName: internal-kubectl
  containers:
  - name: wfeventcreator
    image: krisclarkdev/tok8sevents:arm64v8
    env:
    - name: URL
      value: "https://CHANGEME.wavefront.com"
    - name: TOKEN
      value: "CHANGEME"
    - name: EVENTNAME
      value: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    - name: ENDEVENT
      value: "1"
    imagePullPolicy: Always
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
---
apiVersion: v1
kind: Pod
metadata:
  name: post-delete-hook-pod
  annotations:
    "helm.sh/hook": post-delete
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  serviceAccountName: internal-kubectl
  containers:
  - name: wfeventcreator
    image: krisclarkdev/tok8sevents:arm64v8
    env:
    - name: URL
      value: "https://CHANGEME.wavefront.com"
    - name: TOKEN
      value: "CHANGEME"
    - name: EVENTNAME
      value: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    - name: ENDEVENT
      value: "1"
    imagePullPolicy: Always
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
---
apiVersion: v1
kind: Pod
metadata:
  name: post-upgrade-hook-pod
  annotations:
    "helm.sh/hook": post-upgrade
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  serviceAccountName: internal-kubectl
  containers:
  - name: wfeventcreator
    image: krisclarkdev/tok8sevents:arm64v8
    env:
    - name: URL
      value: "https://CHANGEME.wavefront.com"
    - name: TOKEN
      value: "CHANGEME"
    - name: EVENTNAME
      value: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    - name: ENDEVENT
      value: "1"
    imagePullPolicy: Always
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
---
apiVersion: v1
kind: Pod
metadata:
  name: post-rollback-hook-pod
  annotations:
    "helm.sh/hook": post-rollback
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  serviceAccountName: internal-kubectl
  containers:
  - name: wfeventcreator
    image: krisclarkdev/tok8sevents:arm64v8
    env:
    - name: URL
      value: "https://CHANGEME.wavefront.com"
    - name: TOKEN
      value: "CHANGEME"
    - name: EVENTNAME
      value: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    - name: ENDEVENT
      value: "1"
    imagePullPolicy: Always
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
```